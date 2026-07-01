"use client";

import { useState, useEffect } from "react";
import { createCourse, getCourses, deleteCourse, seedCourses } from "@/app/admin/course-actions";
import { Loader2, Plus, Trash2, Database } from "lucide-react";

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
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [slug, setSlug] = useState("");
  const [about, setAbout] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !slug || !about) return;

    setIsSubmitting(true);
    const res = await createCourse({
      title,
      category,
      slug,
      about,
    });

    if (res.success) {
      setTitle("");
      setCategory("");
      setSlug("");
      setAbout("");
      fetchCourses();
    } else {
      alert("Failed to create course");
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      await deleteCourse(id);
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
      {/* Create Course Form */}
      <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-3xl p-7 shadow-2xl relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-neutral-200">Add New Course</h2>
          <button
            onClick={handleSeed}
            disabled={isSeeding || loading}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 font-medium rounded-lg transition-colors disabled:opacity-50 text-sm"
          >
            {isSeeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
            {isSeeding ? "Seeding..." : "Seed Default 33 Courses"}
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
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
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">URL Slug (e.g. react-mastery)</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E6C875]/50 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
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
                  rows={2}
                  className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E6C875]/50 transition-all resize-none"
                  required
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-black/40 border border-neutral-800 rounded-2xl p-5 relative group">
                <button 
                  onClick={() => handleDelete(course.id)}
                  className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E6C875]">{course.category}</span>
                <h3 className="font-bold text-lg text-white mt-2 mb-2">{course.title}</h3>
                <p className="text-sm text-neutral-400 line-clamp-2">{course.about}</p>
                <div className="mt-4 pt-4 border-t border-neutral-800 flex justify-between text-xs text-neutral-500">
                  <span>Slug: {course.slug}</span>
                  <span>{new Date(course.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
