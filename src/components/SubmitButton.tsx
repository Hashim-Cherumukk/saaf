"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  label: string;
  loadingLabel?: string;
  isDanger?: boolean;
}

export default function SubmitButton({ label, loadingLabel = "Saving...", isDanger = false }: SubmitButtonProps) {
  // This hook magically knows if the parent form is currently submitting
  const { pending } = useFormStatus();

  // Define base styles depending on if it's a normal save button or a red delete button
  const baseStyles = isDanger 
    ? "border border-red-200 text-red-600 px-6 py-2 text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
    : "bg-black text-white px-10 py-3 text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2";

  const hoverStyles = isDanger ? "hover:bg-red-50" : "hover:bg-zinc-800";
  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`${baseStyles} ${pending ? disabledStyles : hoverStyles}`}
    >
      {pending ? (
        <>
          {/* A smooth CSS loading spinner */}
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </button>
  );
}