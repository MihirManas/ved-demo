"use client";

import { useState, useEffect, useRef } from "react";
import { createMentor, getMentors, deleteMentor } from "@/app/admin/mentor-actions";
import { Loader2, Plus, Trash2, Image as ImageIcon } from "lucide-react";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (!name || !designation || !bio) return;

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
      if (fileInputRef.current) fileInputRef.current.value = "";
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
      <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-3xl p-7 shadow-2xl relative overflow-hidden">
        <h2 className="text-xl font-bold mb-6 text-neutral-200">Add New Mentor</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Mentor Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E6C875]/50 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Designation / Role</label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="e.g. Senior Software Engineer at Google"
                  className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E6C875]/50 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Bio / Details</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E6C875]/50 transition-all resize-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Mentor Photo</label>
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
                      <span className="text-sm">Click to upload photo</span>
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
                  placeholder="e.g. John Doe - Full Stack Developer"
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
            {isSubmitting ? "Adding..." : "Add Mentor"}
          </button>
        </form>
      </div>

      {/* Mentor List */}
      <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-3xl p-7 shadow-2xl relative overflow-hidden">
        <h2 className="text-xl font-bold mb-6 text-neutral-200">Manage Mentors</h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-[#E6C875] animate-spin" />
          </div>
        ) : mentors.length === 0 ? (
          <div className="text-center py-12 text-neutral-500">
            No mentors added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="bg-black/40 border border-neutral-800 rounded-2xl overflow-hidden group">
                <div className="h-48 bg-neutral-900 relative">
                  {mentor.imagePath ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={mentor.imagePath} alt={mentor.imageAlt || mentor.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-700">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                  )}
                  <button 
                    onClick={() => handleDelete(mentor.id)}
                    className="absolute top-3 right-3 p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/40 transition-colors backdrop-blur-md opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-white">{mentor.name}</h3>
                  <p className="text-sm font-medium text-[#E6C875] mb-2">{mentor.designation}</p>
                  <p className="text-sm text-neutral-400 line-clamp-3">{mentor.bio}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
