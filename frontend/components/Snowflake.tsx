import React from "react";

export default function Snowflake({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2v20" />
        <path d="M4.93 4.93l14.14 14.14" />
        <path d="M2 12h20" />
        <path d="M4.93 19.07l14.14-14.14" />
        <path d="M12 6l2 2" />
        <path d="M12 6l-2 2" />
        <path d="M12 18l2-2" />
        <path d="M12 18l-2-2" />
        <path d="M6 12l2-2" />
        <path d="M6 12l2 2" />
        <path d="M18 12l-2-2" />
        <path d="M18 12l-2 2" />
      </g>
    </svg>
  );
}
