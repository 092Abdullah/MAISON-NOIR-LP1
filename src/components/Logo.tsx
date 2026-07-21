import React from "react";

interface LogoProps {
  color?: string;
  height?: number;
  className?: string;
}

export default function Logo({
  color = "#e2e2e2",
  height = 40,
  className = "",
}: LogoProps) {
  const aspectRatio = 120 / 40;
  const width = height * aspectRatio;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 40"
      width={width}
      height={height}
      className={className}
      aria-label="Maison Noir"
      role="img"
      fill="none"
    >
      {/* Diamond glyph */}
      <polygon
        points="8,4 14,10 8,16 2,10"
        fill={color}
      />

      {/* MAISON */}
      <text
        x="22"
        y="13"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="10"
        fontWeight="700"
        letterSpacing="3"
        fill={color}
        dominantBaseline="auto"
      >
        MAISON
      </text>

      {/* NOIR */}
      <text
        x="22"
        y="26"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="10"
        fontWeight="300"
        letterSpacing="6"
        fill={color}
        dominantBaseline="auto"
      >
        NOIR
      </text>
    </svg>
  );
}

export { Logo };
