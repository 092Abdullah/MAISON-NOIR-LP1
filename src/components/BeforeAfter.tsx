import { useCallback, useEffect, useRef, useState } from 'react';

interface BeforeAfterProps { before: string; after: string; initialPosition?: number; }

export function BeforeAfter({ before, after, initialPosition = 50 }: BeforeAfterProps) {
  const [pos, setPos] = useState(initialPosition);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const clamp = (v: number) => Math.min(100, Math.max(0, v));
  const posFromX = useCallback((x: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return pos;
    return clamp(((x - rect.left) / rect.width) * 100);
  }, [pos]);
  const onMouseDown = (e: React.MouseEvent) => { e.preventDefault(); setDragging(true); setPos(posFromX(e.clientX)); };
  const onTouchStart = (e: React.TouchEvent) => { setDragging(true); setPos(posFromX(e.touches[0].clientX)); };
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPos(clamp(((x - rect.left) / rect.width) * 100));
    };
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [dragging]);
  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-2xl select-none" style={{ aspectRatio: '16/9', cursor: dragging ? 'grabbing' : 'col-resize' }}>
      <img src={before} alt="Before" className="absolute inset-0 h-full w-full object-cover" draggable={false} loading="lazy" />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <img src={after} alt="After" className="absolute inset-0 h-full w-full object-cover" draggable={false} loading="lazy" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-px bg-white/70" style={{ left: `${pos}%` }} />
      <div className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: `${pos}%` }} onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/70 shadow-xl backdrop-blur-sm" style={{ transform: dragging ? 'scale(1.1)' : 'scale(1)', cursor: 'grab', transition: 'transform 0.15s' }}>
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none"><path d="M6 7H16M6 7L3 4M6 7L3 10M16 7L19 4M16 7L19 10" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>
      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-label text-[#a8a8a8] backdrop-blur-sm">Before</span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-label text-white/90 backdrop-blur-sm">After</span>
    </div>
  );
}

export default BeforeAfter;
