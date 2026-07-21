import React, { CSSProperties, ReactNode } from "react";

interface GlassSurfaceProps {
  children?: ReactNode;
  className?: string;
  borderRadius?: string | number;
  backgroundOpacity?: number;
  style?: CSSProperties;
}

export default function GlassSurface({
  children,
  className = "",
  borderRadius = "12px",
  backgroundOpacity = 0.06,
  style,
}: GlassSurfaceProps) {
  const radius =
    typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius;

  const glassStyle: CSSProperties = {
    backgroundColor: `rgba(255, 255, 255, ${backgroundOpacity})`,
    border: "1px solid #1e1e1e",
    borderRadius: radius,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    ...style,
  };

  return (
    <div className={className} style={glassStyle}>
      {children}
    </div>
  );
}

export { GlassSurface };
