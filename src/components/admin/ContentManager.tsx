"use client";

import { useState, useEffect, useRef } from "react";
import { upsertSiteContent, getAllSiteContent } from "@/app/admin/content-actions";
import { Loader2, Save, Image as ImageIcon, Type, X } from "lucide-react";
import { UploadDropzone } from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";

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

  // Image upload is handled by UploadDropzone component directly now.

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-white/[0.02] backdrop-blur-2xl border border-gray-100 dark:border-white/[0.05] rounded-3xl p-7 shadow-xl dark:shadow-2xl relative overflow-hidden">
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-neutral-200">Website Content Management</h2>
        <p className="text-gray-500 dark:text-neutral-400 text-sm mb-8">Update the text and images across the public facing website instantly.</p>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-[#E6C875] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PREDEFINED_SECTIONS.map((section) => (
              <div key={section.id} className="bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-neutral-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  {section.type === "IMAGE" ? <ImageIcon className="w-4 h-4 text-purple-500 dark:text-purple-400" /> : <Type className="w-4 h-4 text-blue-500 dark:text-blue-400" />}
                  <h3 className="font-semibold text-gray-900 dark:text-white">{section.label}</h3>
                  <span className="text-xs text-gray-600 dark:text-neutral-400 bg-gray-200 dark:bg-neutral-900 px-2 py-0.5 rounded-full ml-auto">{section.id}</span>
                </div>

                {section.type === "TEXT" ? (
                  <div className="space-y-3">
                    <textarea
                      value={contents[section.id] || ""}
                      onChange={(e) => handleTextChange(section.id, e.target.value)}
                      className="w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-neutral-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E6C875]/50 focus:border-transparent dark:focus:border-[#E6C875]/50 transition-all resize-none min-h-[100px]"
                      placeholder={`Enter text for ${section.label.toLowerCase()}`}
                    />
                    <button
                      onClick={() => handleSaveText(section.id, contents[section.id])}
                      disabled={savingKey === section.id}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-700 text-gray-900 dark:text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                      {savingKey === section.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      {savingKey === section.id ? "Saving..." : "Save Text"}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="border-2 border-dashed border-gray-300 dark:border-neutral-700 rounded-xl p-4 flex flex-col items-center justify-center hover:border-gray-400 dark:hover:border-[#E6C875]/50 transition-colors min-h-[160px] bg-white dark:bg-black/30 relative overflow-hidden group">
                      {contents[section.id] ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={contents[section.id]} alt={section.label} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                          <button 
                            type="button"
                            onClick={() => {
                              const newContents = { ...contents };
                              delete newContents[section.id];
                              setContents(newContents);
                            }}
                            className="absolute z-10 bg-white/90 dark:bg-black/70 hover:bg-red-50 dark:hover:bg-red-500/80 text-red-600 dark:text-white px-3 py-1 rounded-md transition-colors text-sm font-medium opacity-0 group-hover:opacity-100 shadow-md"
                          >
                            Remove Image
                          </button>
                        </>
                      ) : (
                        <div className="w-full relative z-20">
                          {savingKey === section.id ? (
                            <div className="flex flex-col items-center justify-center py-6">
                              <Loader2 className="w-8 h-8 text-[#E6C875] animate-spin mb-2" />
                              <span className="text-sm text-gray-500 dark:text-neutral-400">Saving to database...</span>
                            </div>
                          ) : (
                            <UploadDropzone
                              endpoint="imageUploader"
                              onClientUploadComplete={async (res) => {
                                if (res && res.length > 0) {
                                  const uploadedUrl = res[0].url;
                                  setSavingKey(section.id);
                                  
                                  // Save to database
                                  const dbRes = await upsertSiteContent({ id: section.id, value: uploadedUrl, type: "IMAGE" });
                                  if (dbRes.success) {
                                    setContents(prev => ({ ...prev, [section.id]: uploadedUrl }));
                                  } else {
                                    alert("Failed to save image to content database");
                                  }
                                  
                                  setSavingKey(null);
                                }
                              }}
                              onUploadError={(error: Error) => {
                                alert(`ERROR! ${error.message}`);
                              }}
                              appearance={{
                                container: "border-none bg-transparent w-full p-0 py-2 m-0",
                                label: "text-[#E6C875] hover:text-white transition-colors",
                                allowedContent: "text-neutral-500 text-xs mt-2",
                                button: "bg-[#E6C875] text-black font-bold mt-4 px-4 py-2 text-sm"
                              }}
                            />
                          )}
                        </div>
                      )}
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
