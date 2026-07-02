"use client";

import { useState, useEffect, useRef } from "react";
import { createMentor, getMentors, deleteMentor } from "@/app/admin/mentor-actions";
import { Loader2, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { UploadDropzone } from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";

type Mentor = {
  id: number;
  name: string;
  designation: string;
  bio: string;
  imagePath: string | null;
  imageAlt: string | null;
  createdAt: Date;
};

export default function MentorManager() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [bio, setBio] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchMentors();
  }, []);

  async function fetchMentors() {
    setLoading(true);
    const res = await getMentors();
    if (res.success && res.mentors) {
      setMentors(res.mentors);
    }
    setLoading(false);
  }

  // Image state handled by UploadThing now

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !designation || !bio) return;

    setIsSubmitting(true);
    let uploadedImagePath = null;

    // Upload is handled instantly by UploadDropzone, so imagePreview contains the URL
    if (imagePreview) {
      uploadedImagePath = imagePreview;
    }

    const res = await createMentor({
      name,
      designation,
      bio,
      imagePath: uploadedImagePath,
      imageAlt: imageAlt || name,
    });

    if (res.success) {
      setName("");
      setDesignation("");
      setBio("");
      setImageAlt("");
      setImageFile(null);
      setImagePreview(null);
      fetchMentors();
    } else {
      alert("Failed to add mentor");
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this mentor?")) {
      await deleteMentor(id);
      fetchMentors();
    }
  };

  return (
    <div className="space-y-8">
      {/* Create Mentor Form */}
      <div className="bg-white dark:bg-white/[0.02] backdrop-blur-2xl border border-gray-100 dark:border-white/[0.05] rounded-3xl p-7 shadow-xl dark:shadow-2xl relative overflow-hidden">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-neutral-200">Add New Mentor</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-neutral-400 mb-2">Mentor Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-neutral-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E6C875]/50 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-neutral-400 mb-2">Designation / Role</label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="e.g. Senior Software Engineer at Google"
                  className="w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-neutral-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E6C875]/50 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-neutral-400 mb-2">Bio / Details</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-neutral-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E6C875]/50 focus:border-transparent transition-all resize-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-neutral-400 mb-2">Mentor Photo</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-neutral-700 rounded-xl p-4 flex flex-col items-center justify-center hover:border-gray-400 dark:hover:border-[#E6C875]/50 transition-colors min-h-[160px] bg-white dark:bg-black/30 relative overflow-hidden group">
                  {imagePreview ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                      <button 
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="absolute z-10 bg-white/90 dark:bg-black/70 hover:bg-red-50 dark:hover:bg-red-500/80 text-red-600 dark:text-white px-3 py-1 rounded-md transition-colors text-sm font-medium opacity-0 group-hover:opacity-100 shadow-md"
                      >
                        Remove Image
                      </button>
                    </>
                  ) : (
                    <UploadDropzone
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        if (res && res.length > 0) {
                          setImagePreview(res[0].url);
                        }
                      }}
                      onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                      }}
                      appearance={{
                        container: "border-none bg-transparent w-full p-0 py-2 m-0",
                        label: "text-[#D4B55E] dark:text-[#E6C875] hover:text-gray-900 dark:hover:text-white transition-colors",
                        allowedContent: "text-gray-500 dark:text-neutral-500 text-xs mt-2",
                        button: "bg-[#E6C875] text-black font-bold mt-4 px-4 py-2 text-sm"
                      }}
                    />
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-neutral-400 mb-2">Image Alt Text (SEO)</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="e.g. John Doe - Full Stack Developer"
                  className="w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-neutral-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E6C875]/50 focus:border-transparent transition-all"
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
            {isSubmitting ? "Adding..." : "Add Mentor"}
          </button>
        </form>
      </div>

      {/* Mentor List */}
      <div className="bg-white dark:bg-white/[0.02] backdrop-blur-2xl border border-gray-100 dark:border-white/[0.05] rounded-3xl p-7 shadow-xl dark:shadow-2xl relative overflow-hidden">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-neutral-200">Manage Mentors</h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-[#E6C875] animate-spin" />
          </div>
        ) : mentors.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-neutral-500">
            No mentors added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-neutral-800 rounded-2xl overflow-hidden group shadow-sm">
                <div className="h-48 bg-gray-200 dark:bg-neutral-900 relative">
                  {mentor.imagePath ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={mentor.imagePath} alt={mentor.imageAlt || mentor.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-neutral-700">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                  )}
                  <button 
                    onClick={() => handleDelete(mentor.id)}
                    className="absolute top-3 right-3 p-2 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-500/40 transition-colors backdrop-blur-md opacity-0 group-hover:opacity-100 shadow-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{mentor.name}</h3>
                  <p className="text-sm font-medium text-[#D4B55E] dark:text-[#E6C875] mb-2">{mentor.designation}</p>
                  <p className="text-sm text-gray-600 dark:text-neutral-400 line-clamp-3">{mentor.bio}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
