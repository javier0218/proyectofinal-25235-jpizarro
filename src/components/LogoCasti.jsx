import React from "react";

export default function LogoLacasti({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Lacasti Clothes logo"
      focusable="false"
    >
      {/* Borde/acento */}
      <circle cx="32" cy="32" r="30" fill="none" stroke="#2bd4c7" strokeWidth="3" />
      {/* L */}
      <path
        d="M20 18 v28 h16"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* C */}
      <path
        d="M46 22 a10 10 0 1 0 0 20"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
