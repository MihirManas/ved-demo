"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ContentProtection({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Exempt legal and domain pages where users might need to copy info
  const excludedPaths = ["/privacy", "/terms", "/refund", "/domains"];
  const isProtected = !excludedPaths.includes(pathname);

  useEffect(() => {
    if (!isProtected) return;

    // Helper to check if event originated from an input element
    const isInputTarget = (e: Event) => {
      const target = e.target as HTMLElement;
      return (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      );
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow default actions if typing in an input field
      if (isInputTarget(e)) return;

      const isMac = navigator.userAgent.includes("Mac");
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Prevent copy(c), save(s), print(p), view source(u)
      if (cmdOrCtrl && ["c", "s", "p", "u"].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }

      // Prevent DevTools (F12, Ctrl+Shift+I, Cmd+Option+I)
      if (
        e.key === "F12" ||
        (cmdOrCtrl && e.shiftKey && e.key.toLowerCase() === "i") ||
        (isMac && e.metaKey && e.altKey && e.key.toLowerCase() === "i")
      ) {
        e.preventDefault();
      }

      // Deter PrintScreen
      if (e.key === "PrintScreen") {
        navigator.clipboard.writeText(""); // Clear clipboard to prevent pasting screenshot
        e.preventDefault();
      }
    };

    const handleClipboard = (e: ClipboardEvent) => {
      if (isInputTarget(e)) return;
      e.preventDefault();
    };

    // Attach listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("copy", handleClipboard);
    document.addEventListener("cut", handleClipboard);
    document.addEventListener("paste", handleClipboard);

    return () => {
      // Cleanup on unmount or path change
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("copy", handleClipboard);
      document.removeEventListener("cut", handleClipboard);
      document.removeEventListener("paste", handleClipboard);
    };
  }, [isProtected]);

  return (
    <div
      className={`w-full h-full ${isProtected ? "select-none" : ""}`}
      style={isProtected ? { WebkitTouchCallout: "none" } : {}}
    >
      {children}
    </div>
  );
}
