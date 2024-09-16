import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
}

export default function Tag({ children }: TagProps) {
  return (
    <button
      type="button"
      aria-label="filter category"
      className="px-4 py-2 text-xs border-2 rounded-full w-fit border-primary"
    >
      {children}
    </button>
  );
}
