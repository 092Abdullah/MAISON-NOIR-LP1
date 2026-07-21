import React, { useCallback, useRef, useState } from 'react';
interface Spark { id: number; x: number; y: number; angle: number; }
const ClickSpark: React.FC<{ sparkColor?: string; sparkSize?: number; sparkRadius?: number; sparkCount?: number; duration?: number; children: React.ReactNode }> = ({ sparkColor = '#a8a8a8', sparkSize = 7, sparkRadius = 20, sparkCount = 8, duration = 500, children }) => {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const counter = useRef(0);
  const handleClick = useCallback((e: React.MouseEvent) => {
    const ns: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({ id: counter.current++, x: e.clientX, y: e.clientY, angle: (360 / sparkCount) * i }));
    setSparks((p) => [...p, ...ns]);
    setTimeout(() => setSparks((p) => p.filter((s) => !ns.some((n) => n.id === s.id))), duration + 100);
  }, [sparkCount, duration]);
  return (
    <div className="contents" onClick={handleClick}>
      {children}
      <svg className="pointer-events-none fixed inset-0 z-[9999]" style={{ width: '100vw', height: '100vh' }} aria-hidden>
        {sparks.map((s) => { const r = (s.angle * Math.PI) / 180; return <line key={s.id} x1={s.x} y1={s.y} x2={s.x} y2={s.y} stroke={sparkColor} strokeWidth={sparkSize / 4} strokeLinecap="round" style={{ animation: `cspark ${duration}ms cubic-bezier(0.22,1,0.36,1) forwards`, '--tx': `${Math.cos(r) * sparkRadius}px`, '--ty': `${Math.sin(r) * sparkRadius}px` } as React.CSSProperties} />; })}
      </svg>
      <style>{`@keyframes cspark{0%{stroke-opacity:1;transform:translate(0,0)}100%{stroke-opacity:0;transform:translate(calc(var(--tx)*1.4),calc(var(--ty)*1.4))}}`}</style>
    </div>
  );
};
export default ClickSpark;
