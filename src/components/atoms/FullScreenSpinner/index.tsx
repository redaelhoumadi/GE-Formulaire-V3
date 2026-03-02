/*"use client";

import { useEffect } from "react";

export default function FullScreenSpinner() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        <div className="h-24 w-24 border-4 border-ge-gray-2 border-t-ge-green rounded-full animate-spin" />
        <p className="text-sm text-ge-gray-3 animate-pulse">
          Recherche de votre véhicule...
        </p>
      </div>
    </div>
  );
}*/