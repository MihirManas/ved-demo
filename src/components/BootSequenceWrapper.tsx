"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import BootSequence from "./BootSequence";

export default function BootSequenceWrapper({ children }: { children: React.ReactNode }) {
  const [bootComplete, setBootComplete] = useState(false);
  const { resolvedTheme } = useTheme();

  return (
    <>
      {!bootComplete && (
        <BootSequence
          onComplete={() => setBootComplete(true)}
          theme={resolvedTheme === "dark" ? "dark" : "light"}
        />
      )}
      <div className={!bootComplete ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>
        {children}
      </div>
    </>
  );
}
