import React, { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Logo } from '@/components/Logo';

interface MenuItem { label: string; link: string; }

const MobileMenu: React.FC<{ items: MenuItem[]; socialItems?: { label: string; link: string }[] }> = ({ items, socialItems = [] }) => {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const socialsRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const buildTl = useCallback(() => {
    const panels = panelsRef.current.filter(Boolean) as HTMLDivElement[];
    const listItems = itemsRef.current.filter(Boolean) as HTMLLIElement[];
    tl.current = gsap.timeline({ paused: true });
    tl.current.set(overlayRef.current, { display: 'flex' })
      .fromTo(panels, { xPercent: 105 }, { xPercent: 0, duration: 0.55, ease: 'power3.inOut', stagger: 0.06 })
      .fromTo(listItems, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', stagger: 0.07 }, '-=0.2');
    if (socialsRef.current) tl.current.fromTo(socialsRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.25');
  }, []);

  useEffect(() => { buildTl(); return () => { tl.current?.kill(); }; }, [buildTl]);

  const toggle = () => {
    if (!open) { setOpen(true); tl.current?.play(); }
    else { tl.current?.reverse().then(() => { setOpen(false); gsap.set(overlayRef.current, { display: 'none' }); }); }
  };

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-[90] flex items-center justify-between px-5 py-4">
        <a href="#top"><Logo height={28} color="#444" /></a>
        <button onClick={toggle} className="flex items-center gap-2 text-sm font-medium text-[#a8a8a8]">
          <span className="hidden sm:inline">{open ? 'Close' : 'Menu'}</span>
          <div className="flex h-8 w-8 flex-col items-center justify-center gap-[5px]">
            <span className="block h-px w-5 origin-center bg-current transition-all duration-300" style={{ transform: open ? 'translateY(3px) rotate(45deg)' : '' }} />
            <span className="block h-px w-5 origin-center bg-current transition-all duration-300" style={{ transform: open ? 'translateY(-3px) rotate(-45deg)' : '' }} />
          </div>
        </button>
      </div>
      <div ref={overlayRef} className="fixed inset-0 z-[80] hidden overflow-hidden">
        {['#0a0a0a', '#111', '#181818'].map((c, i) => <div key={i} ref={(el) => { panelsRef.current[i] = el; }} className="absolute inset-0" style={{ background: c, zIndex: i }} />)}
        <div className="absolute inset-0 z-10 flex flex-col justify-between px-8 pb-12 pt-24">
          <ul className="space-y-2">
            {items.map((item, i) => (
              <li key={item.link} ref={(el) => { itemsRef.current[i] = el; }}>
                <a href={item.link} onClick={toggle} className="group flex items-baseline gap-4 py-1">
                  <span className="text-label text-[#a8a8a8]">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-4xl text-[#e2e2e2] transition-colors group-hover:text-[#a8a8a8] sm:text-6xl">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          {socialItems.length > 0 && <div ref={socialsRef} className="flex gap-6">{socialItems.map((s) => <a key={s.label} href={s.link} className="text-sm text-[#555]">{s.label}</a>)}</div>}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
