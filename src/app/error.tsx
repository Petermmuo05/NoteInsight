"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="bg-gray-950 text-gray-100 flex items-center justify-center min-h-screen p-6">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4 text-white tracking-tight">
          Something went wrong
        </h1>
        <p className="mb-6 text-gray-400">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
