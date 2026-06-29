"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ContentProtection({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Exempt legal and domain pages where users might need to copy info
  const excludedPaths = ["/privacy", "/terms", "/refund", "/domains"];
  const isProtected = !excludedPaths.includes(pathname);

  useEffect(() => {
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
      // Globally prevent right-click everywhere to hide source and inspect
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.userAgent.includes("Mac");
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // 1. GLOBAL BLOCKS (Always prevent, regardless of page or input)
      // Prevent save(s), print(p), view source(u)
      if (cmdOrCtrl && ["s", "p", "u"].includes(e.key.toLowerCase())) {
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
        navigator.clipboard.writeText(""); // Clear clipboard
        e.preventDefault();
      }

      // 2. CONDITIONAL BLOCKS
      // Prevent copy(c) ONLY if on a protected page AND not in an input
      if (cmdOrCtrl && e.key.toLowerCase() === "c") {
        if (isProtected && !isInputTarget(e)) {
          e.preventDefault();
        }
      }
    };

    const handleClipboard = (e: ClipboardEvent) => {
      // Prevent clipboard events ONLY if on protected page and not in an input
      if (isProtected && !isInputTarget(e)) {
        e.preventDefault();
      }
    };

    // Attach listeners globally
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
