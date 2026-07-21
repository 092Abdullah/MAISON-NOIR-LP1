import React, { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface Item { label: string; href: string; }

const PillNav: React.FC<{ items: Item[] }> = ({ items }) => {
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState(0);

  const moveTo = useCallback((index: number, animate = true) => {
    const el = itemRefs.current[index]; const pill = pillRef.current; const nav = navRef.current;
    if (!el || !pill || !nav) return;
    const er = el.getBoundingClientRect(); const nr = nav.getBoundingClientRect();
    if (animate) gsap.to(pill, { x: er.left - nr.left, width: er.width, duration: 0.38, ease: 'power3.out' });
    else gsap.set(pill, { x: er.left - nr.left, width: er.width });
  }, []);

  useEffect(() => {
    gsap.set(pillRef.current, { opacity: 0 });
    requestAnimationFrame(() => { moveTo(active, false); gsap.to(pillRef.current, { opacity: 1, duration: 0.5, delay: 0.15 }); });
  }, []);

  return (
    <nav ref={navRef} className="relative flex items-center rounded-full border border-[#2a2a2a] bg-[#111] px-1.5 py-1.5" onMouseLeave={() => { setHovered(null); moveTo(active); }}>
      <div ref={pillRef} className="pointer-events-none absolute top-1.5 h-[calc(100%-12px)] rounded-full bg-[#1e1e1e]" style={{ opacity: 0 }} />
      {items.map((item, i) => (
        <a key={item.href} ref={(el) => { itemRefs.current[i] = el; }} href={item.href}
          className="relative z-10 select-none rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-150"
          style={{ color: hovered === i || (hovered === null && active === i) ? '#e2e2e2' : '#555' }}
          onMouseEnter={() => { setHovered(i); moveTo(i); }} onClick={() => setActive(i)}>
          {item.label}
        </a>
      ))}
    </nav>
  );
};

export default PillNav;
