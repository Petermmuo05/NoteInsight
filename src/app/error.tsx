// app/error.tsx
"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body className="bg-gray-950 text-gray-100 flex items-center justify-center min-h-screen p-6">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4 text-white tracking-tight">
            Something went wrong
          </h1>
          <p className="text-gray-400 mb-8">
            {"Unexpected error occurred."}
          </p>
          <button
            onClick={reset}
            className="bg-gray-800 hover:bg-gray-700 transition-colors px-5 py-2 rounded text-white font-medium border border-gray-700"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
