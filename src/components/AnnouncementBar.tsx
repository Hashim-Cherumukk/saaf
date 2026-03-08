"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { getStoreSettings } from "@/app/admin/actions";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  // Dynamic State from Neon Database
  const [text, setText] = useState("");
  const [isAnnouncementOn, setIsAnnouncementOn] = useState(false);

  useEffect(() => {
    // Fetch the live settings from the database when the layout loads
    getStoreSettings().then((settings) => {
      setText(settings.announcementText);
      setIsAnnouncementOn(settings.isAnnouncementOn);
    });
  }, []);

  // If the admin turned it off, or the user clicked 'X', or it hasn't loaded yet: hide it!
  if (!isVisible || !isAnnouncementOn || !text) return null;

  return (
    <div className="relative flex min-h-10 w-full items-center justify-center bg-black px-10 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white">
      <span className="text-center">{text}</span>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 opacity-50 transition-opacity hover:opacity-100"
        aria-label="Close announcement"
      >
        <X size={14} strokeWidth={2} />
      </button>
    </div>
  );
}