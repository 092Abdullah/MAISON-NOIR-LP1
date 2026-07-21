import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Masonry.css';
export interface MasonryItem { id: string | number; img: string; url?: string; height?: number; }
const Masonry: React.FC<{ items: MasonryItem[]; ease?: string; duration?: number; stagger?: number; animateFrom?: 'bottom' | 'top'; blurToFocus?: boolean; scaleOnHover?: boolean; hoverScale?: number; colorShiftOnHover?: boolean; }> = ({ items, ease = 'power3.out', duration = 0.6, stagger = 0.05, animateFrom = 'bottom', blurToFocus = true }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const seen = useRef<Set<string | number>>(new Set());
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.querySelectorAll<HTMLElement>('.masonry-item')).filter((el) => !seen.current.has(el.dataset.id!));
    if (!cards.length) return;
    cards.forEach((el) => seen.current.add(el.dataset.id!));
    gsap.fromTo(cards, { opacity: 0, y: animateFrom === 'bottom' ? 36 : -36, ...(blurToFocus ? { filter: 'blur(6px)' } : {}) }, { opacity: 1, y: 0, filter: 'blur(0px)', duration, ease, stagger });
  }, [items, ease, duration, stagger, animateFrom, blurToFocus]);
  return (
    <div ref={gridRef} className="masonry-grid">
      {items.map((item) => (
        <a key={item.id} href={item.url ?? '#'} data-id={String(item.id)} className="masonry-item">
          <div className="masonry-inner"><img src={item.img} alt="" className="masonry-img" style={{ height: item.height ? `${item.height}px` : '400px' }} loading="lazy" /></div>
        </a>
      ))}
    </div>
  );
};
export default Masonry;
