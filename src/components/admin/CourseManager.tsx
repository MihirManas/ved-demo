"use client";

import { useState, useEffect, useRef } from "react";
import { createCourse, getCourses, deleteCourse, seedCourses, updateCourse } from "@/app/admin/course-actions";
import { Loader2, Plus, Trash2, Database, Pencil, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";

type Course = {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string | null;
  tag: string | null;
  about: string;
  createdAt: Date;
};

export default function CourseManager() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [slug, setSlug] = useState("");
  const [about, setAbout] = useState("");
  const [tag, setTag] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    setLoading(true);
    const res = await getCourses();
    if (res.success && res.courses) {
      setCourses(res.courses as Course[]);
    }
    setLoading(false);
  }

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setCategory("");
    setSlug("");
    setAbout("");
    setTag("");
    setImage("");
  };

  const handleEdit = (course: Course) => {
    setEditingId(course.id);
    setTitle(course.title);
    setCategory(course.category);
    setSlug(course.slug);
    setAbout(course.about);
    setTag(course.tag || "");
    setImage(course.image || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !slug || !about) return;

    setIsSubmitting(true);
    
    const data = {
      title,
      category,
      slug,
      about,
      tag: tag || null,
      image: image || null,
    };

    let res;
    if (editingId) {
      res = await updateCourse(editingId, data);
    } else {
      res = await createCourse(data);
    }

    if (res.success) {
      resetForm();
      fetchCourses();
    } else {
      alert(`Failed to ${editingId ? "update" : "create"} course`);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      await deleteCourse(id);
      if (editingId === id) resetForm();
      fetchCourses();
    }
  };

  const handleSeed = async () => {
    if (confirm("This will load all 33 default courses into the database. Are you sure?")) {
      setIsSeeding(true);
      const res = await seedCourses();
      if (res.success) {
        alert(res.message);
        fetchCourses();
      } else {
        alert(res.error || res.message);
      }
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Create/Edit Course Form */}
      <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-3xl p-7 shadow-2xl relative overflow-hidden">
        <div className="flex justify-between items-center mb-6 border-b border-white/[0.05] pb-4">
          <h2 className="text-xl font-bold text-neutral-200">
            {editingId ? "Edit Course" : "Add New Course"}
          </h2>
          <div className="flex items-center gap-3">
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-lg transition-colors text-sm"
              >
                <X className="w-4 h-4" /> Cancel Edit
              </button>
            )}
            {!editingId && (
              <button
                type="button"
                onClick={handleSeed}
                disabled={isSeeding || loading}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 font-medium rounded-lg transition-colors disabled:opacity-50 text-sm"
              >
                {isSeeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                {isSeeding ? "Seeding..." : "Seed Default 33 Courses"}
              </button>
            )}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* Image Upload Area */}
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Course Image</label>
                <div className={`relative border-2 border-dashed ${image ? 'border-[#E6C875]/50 bg-[#E6C875]/5' : 'border-neutral-800 bg-black/50'} rounded-xl p-4 flex flex-col items-center justify-center transition-all hover:border-[#E6C875]/50 group overflow-hidden min-h-[160px]`}>
                  {image ? (
                    <div className="relative w-full h-32 mb-4">
                      <Image src={image} alt="Preview" fill className="object-cover rounded-lg opacity-80 group-hover:opacity-60 transition-opacity" />
                      <button 
                        type="button"
                        onClick={() => setImage("")}
                        className="absolute top-2 right-2 bg-black/70 hover:bg-red-500/80 text-white p-1.5 rounded-md transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <UploadDropzone
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        if (res && res.length > 0) {
                          setImage(res[0].url);
                        }
                      }}
                      onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                      }}
                      appearance={{
                        container: "border-none bg-transparent w-full p-0 py-2 m-0",
                        label: "text-[#E6C875] hover:text-white transition-colors",
                        allowedContent: "text-neutral-500 text-xs mt-2",
                        button: "bg-[#E6C875] text-black font-bold mt-4"
                      }}
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Course Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E6C875]/50 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">URL Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. react-mastery"
                    className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E6C875]/50 transition-all text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Tag</label>
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="e.g. Frontend"
                    className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E6C875]/50 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E6C875]/50 transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">About / Description</label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows={3}
                  className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E6C875]/50 transition-all resize-none text-sm"
                  required
                />
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 w-full md:w-auto px-10 py-3 bg-[#E6C875] hover:bg-[#d4b55e] text-black font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(230,200,117,0.2)] disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : editingId ? (
              <Pencil className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
            {isSubmitting ? "Saving..." : editingId ? "Update Course" : "Create Course"}
          </button>
        </form>
      </div>

      {/* Course List */}
      <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-3xl p-7 shadow-2xl relative overflow-hidden">
        <h2 className="text-xl font-bold mb-6 text-neutral-200">Manage Courses ({courses.length})</h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-[#E6C875] animate-spin" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12 text-neutral-500">
            No courses created yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-black/40 border border-neutral-800 rounded-2xl overflow-hidden relative group hover:border-neutral-700 transition-colors flex flex-col h-full">
                {/* Actions */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleEdit(course)}
                    className="p-2 bg-blue-500/80 hover:bg-blue-500 text-white rounded-lg shadow-lg backdrop-blur-md transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(course.id)}
                    className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg shadow-lg backdrop-blur-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Course Image */}
                <div className="h-32 bg-neutral-900 relative flex items-center justify-center border-b border-neutral-800">
                  {course.image ? (
                    <Image src={course.image} alt={course.title} fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-neutral-700" />
                  )}
                </div>
                
                {/* Content */}
                <div className="p-5 flex-grow flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#E6C875]">{course.category}</span>
                  <h3 className="font-bold text-lg text-white mt-1 mb-2 leading-tight">{course.title}</h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 mb-4">{course.about}</p>
                  
                  <div className="mt-auto pt-4 border-t border-neutral-800/50 flex justify-between text-[11px] text-neutral-500 font-mono">
                    <span className="truncate pr-2">/{course.slug}</span>
                    <span className="flex-shrink-0">{new Date(course.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
