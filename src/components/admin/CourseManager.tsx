"use client";

import { useState, useEffect, useRef } from "react";
import { createCourse, getCourses, deleteCourse } from "@/app/admin/course-actions";
import { Loader2, Plus, Trash2, Image as ImageIcon } from "lucide-react";

type Course = {
  id: number;
  title: string;
  description: string;
  imagePath: string | null;
  imageAlt: string | null;
  createdAt: Date;
};

export default function CourseManager() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    setLoading(true);
    const res = await getCourses();
    if (res.success && res.courses) {
      setCourses(res.courses);
    }
    setLoading(false);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    setIsSubmitting(true);
    let uploadedImagePath = null;

    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);

      try {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (uploadData.success) {
          uploadedImagePath = uploadData.url;
        } else {
          alert("Failed to upload image");
          setIsSubmitting(false);
          return;
        }
      } catch (err) {
        console.error("Upload error", err);
        alert("Upload error");
        setIsSubmitting(false);
        return;
      }
    }

    const res = await createCourse({
      title,
      description,
      imagePath: uploadedImagePath,
      imageAlt: imageAlt || title,
    });

    if (res.success) {
      setTitle("");
      setDescription("");
      setImageAlt("");
      setImageFile(null);
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchCourses();
    } else {
      alert("Failed to create course");
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this course?")) {
      await deleteCourse(id);
      fetchCourses();
    }
  };

  return (
    <div className="space-y-8">
      {/* Create Course Form */}
      <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-3xl p-7 shadow-2xl relative overflow-hidden">
        <h2 className="text-xl font-bold mb-6 text-neutral-200">Create New Course</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Course Title / Heading</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E6C875]/50 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E6C875]/50 transition-all resize-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Course Image</label>
                <div 
                  className="border-2 border-dashed border-neutral-700 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-[#E6C875]/50 transition-colors h-40 bg-black/30 relative overflow-hidden"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                  ) : (
                    <div className="flex flex-col items-center text-neutral-500">
                      <ImageIcon className="w-8 h-8 mb-2" />
                      <span className="text-sm">Click to upload image</span>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Image Alt Text (SEO)</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="e.g. Students learning full stack development"
                  className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E6C875]/50 transition-all"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 bg-[#E6C875] hover:bg-[#d4b55e] text-black font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(230,200,117,0.2)] disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            {isSubmitting ? "Creating..." : "Create Course"}
          </button>
        </form>
      </div>

      {/* Course List */}
      <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-3xl p-7 shadow-2xl relative overflow-hidden">
        <h2 className="text-xl font-bold mb-6 text-neutral-200">Manage Courses</h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-[#E6C875] animate-spin" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12 text-neutral-500">
            No courses created yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-black/40 border border-neutral-800 rounded-2xl overflow-hidden group">
                <div className="h-48 bg-neutral-900 relative">
                  {course.imagePath ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={course.imagePath} alt={course.imageAlt || course.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-700">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                  )}
                  <button 
                    onClick={() => handleDelete(course.id)}
                    className="absolute top-3 right-3 p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/40 transition-colors backdrop-blur-md opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-white mb-2">{course.title}</h3>
                  <p className="text-sm text-neutral-400 line-clamp-3">{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
