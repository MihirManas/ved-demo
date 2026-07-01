"use client";

import { useState, useEffect, useRef } from "react";
import { upsertSiteContent, getAllSiteContent } from "@/app/admin/content-actions";
import { Loader2, Save, Image as ImageIcon, Type } from "lucide-react";

type SiteContent = {
  id: string;
  value: string;
  type: string;
  updatedAt: Date;
};

// We can pre-define some common sections here
const PREDEFINED_SECTIONS = [
  { id: "homepage_hero_title", type: "TEXT", label: "Homepage Hero Title" },
  { id: "homepage_hero_subtitle", type: "TEXT", label: "Homepage Hero Subtitle" },
  { id: "homepage_hero_image", type: "IMAGE", label: "Homepage Hero Image" },
  { id: "about_section_text", type: "TEXT", label: "About Section Text" },
];

export default function ContentManager() {
  const [contents, setContents] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    setLoading(true);
    const res = await getAllSiteContent();
    if (res.success && res.contents) {
      const map: Record<string, string> = {};
      res.contents.forEach(c => {
        map[c.id] = c.value;
      });
      setContents(map);
    }
    setLoading(false);
  }

  const handleTextChange = (id: string, value: string) => {
    setContents(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveText = async (id: string, value: string) => {
    setSavingKey(id);
    const res = await upsertSiteContent({ id, value: value || "", type: "TEXT" });
    if (!res.success) {
      alert("Failed to save content");
    }
    setSavingKey(null);
  };

  const handleImageUpload = async (id: string, file: File) => {
    setSavingKey(id);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();
      if (uploadData.success) {
        // Save URL to SiteContent
        const res = await upsertSiteContent({ id, value: uploadData.url, type: "IMAGE" });
        if (res.success) {
          setContents(prev => ({ ...prev, [id]: uploadData.url }));
        } else {
          alert("Failed to save image to content database");
        }
      } else {
        alert("Failed to upload image file");
      }
    } catch (err) {
      console.error("Upload error", err);
      alert("Upload error");
    }
    setSavingKey(null);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-3xl p-7 shadow-2xl relative overflow-hidden">
        <h2 className="text-xl font-bold mb-2 text-neutral-200">Website Content Management</h2>
        <p className="text-neutral-400 text-sm mb-8">Update the text and images across the public facing website instantly.</p>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-[#E6C875] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PREDEFINED_SECTIONS.map((section) => (
              <div key={section.id} className="bg-black/40 border border-neutral-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  {section.type === "IMAGE" ? <ImageIcon className="w-4 h-4 text-purple-400" /> : <Type className="w-4 h-4 text-blue-400" />}
                  <h3 className="font-semibold text-white">{section.label}</h3>
                  <span className="text-xs text-neutral-600 bg-neutral-900 px-2 py-0.5 rounded-full ml-auto">{section.id}</span>
                </div>

                {section.type === "TEXT" ? (
                  <div className="space-y-3">
                    <textarea
                      value={contents[section.id] || ""}
                      onChange={(e) => handleTextChange(section.id, e.target.value)}
                      className="w-full bg-black/50 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E6C875]/50 transition-all resize-none min-h-[100px]"
                      placeholder={`Enter text for ${section.label.toLowerCase()}`}
                    />
                    <button
                      onClick={() => handleSaveText(section.id, contents[section.id])}
                      disabled={savingKey === section.id}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                      {savingKey === section.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      {savingKey === section.id ? "Saving..." : "Save Text"}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="border-2 border-dashed border-neutral-700 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-[#E6C875]/50 transition-colors h-40 bg-black/30 relative overflow-hidden group">
                      {contents[section.id] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={contents[section.id]} alt={section.label} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                      ) : (
                        <div className="flex flex-col items-center text-neutral-500">
                          <ImageIcon className="w-8 h-8 mb-2" />
                          <span className="text-sm">Click to upload new image</span>
                        </div>
                      )}
                      {savingKey === section.id && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
                          <Loader2 className="w-8 h-8 text-[#E6C875] animate-spin" />
                        </div>
                      )}
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(section.id, file);
                        }}
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"
                        title="Upload new image"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
