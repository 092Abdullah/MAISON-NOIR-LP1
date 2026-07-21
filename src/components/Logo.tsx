interface LogoProps { color?: string; height?: number; className?: string; }
export function Logo({ color = '#e2e2e2', height = 32, className }: LogoProps) {
  return (
    <svg viewBox="0 0 160 40" height={height} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Maison Noir" className={className} style={{ display: 'block' }}>
      <polygon points="10,4 16,20 10,36 4,20" fill="none" stroke={color} strokeWidth="1" strokeLinejoin="round" opacity="0.9" />
      <text x="24" y="16" fontFamily="'DM Mono', monospace" fontSize="9" fontWeight="400" letterSpacing="4" fill={color} dominantBaseline="middle" opacity="0.95">MAISON</text>
      <line x1="24" y1="21" x2="152" y2="21" stroke={color} strokeWidth="0.4" opacity="0.3" />
      <text x="24" y="30" fontFamily="'DM Mono', monospace" fontSize="9" fontWeight="400" letterSpacing="4" fill={color} dominantBaseline="middle" opacity="0.65">NOIR</text>
    </svg>
  );
}
