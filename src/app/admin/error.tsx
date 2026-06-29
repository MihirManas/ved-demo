"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin Page Error:", error);
  }, [error]);

  return (
    <div className="fixed inset-0 z-[999] bg-red-900 text-white flex flex-col items-center justify-center p-8">
      <h2 className="text-2xl font-bold mb-4">Something went wrong in the Admin Portal!</h2>
      <pre className="bg-black/50 p-4 rounded text-sm w-full max-w-2xl overflow-auto">
        {error.message}
      </pre>
      <pre className="bg-black/50 p-4 rounded text-xs w-full max-w-2xl overflow-auto mt-4">
        {error.stack}
      </pre>
      <button
        onClick={() => reset()}
        className="mt-6 px-4 py-2 bg-white text-red-900 font-bold rounded"
      >
        Try again
      </button>
    </div>
  );
}
