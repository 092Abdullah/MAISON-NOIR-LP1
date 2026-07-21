'use client';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap/dist/gsap';
import './Masonry.css';

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState<number>(get);
  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, []);
  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => { const { width, height } = entry.contentRect; setSize({ width, height }); });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as const;
};

const preloadImages = async (urls: string[]) =>
  Promise.all(urls.map(src => new Promise<void>(resolve => { const img = new Image(); img.src = src; img.onload = img.onerror = () => resolve(); })));

export interface MasonryItem { id: string; img: string; url: string; height: number; }
interface GridItem extends MasonryItem { x: number; y: number; w: number; h: number; }
interface MasonryProps {
  items: MasonryItem[];
  ease?: string; duration?: number; stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean; hoverScale?: number; blurToFocus?: boolean; colorShiftOnHover?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items, ease = 'power3.out', duration = 0.6, stagger = 0.05,
  animateFrom = 'bottom', scaleOnHover = true, hoverScale = 0.97, blurToFocus = true, colorShiftOnHover = false,
}) => {
  const columns = useMedia(
    ['(min-width:1400px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [4, 3, 2, 2], 1
  );
  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = (item: GridItem) => {
    let dir = animateFrom;
    if (animateFrom === 'random') { const dirs = ['top', 'bottom', 'left', 'right']; dir = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom; }
    switch (dir) {
      case 'top': return { x: item.x, y: -200 };
      case 'bottom': return { x: item.x, y: window.innerHeight + 200 };
      case 'left': return { x: -200, y: item.y };
      case 'right': return { x: window.innerWidth + 200, y: item.y };
      case 'center': return { x: (containerRef.current?.getBoundingClientRect().width ?? 0) / 2 - item.w / 2, y: (containerRef.current?.getBoundingClientRect().height ?? 0) / 2 - item.h / 2 };
      default: return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => { preloadImages(items.map(i => i.img)).then(() => setImagesReady(true)); }, [items]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;
    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height / 2;
      const y = colHeights[col];
      colHeights[col] += height;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;
    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = { x: item.x, y: item.y, width: item.w, height: item.h };
      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item);
        gsap.fromTo(selector, { opacity: 0, x: initialPos.x, y: initialPos.y, width: item.w, height: item.h, ...(blurToFocus && { filter: 'blur(10px)' }) },
          { opacity: 1, ...animationProps, ...(blurToFocus && { filter: 'blur(0px)' }), duration: 0.8, ease: 'power3.out', delay: index * stagger });
      } else {
        gsap.to(selector, { ...animationProps, duration, ease, overwrite: 'auto' });
      }
    });
    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (e: React.MouseEvent, item: GridItem) => {
    if (scaleOnHover) gsap.to(`[data-key="${item.id}"]`, { scale: hoverScale, duration: 0.3, ease: 'power2.out' });
    if (colorShiftOnHover) { const ov = (e.currentTarget as HTMLElement).querySelector('.masonry-overlay') as HTMLElement; if (ov) gsap.to(ov, { opacity: 0.3, duration: 0.3 }); }
  };
  const handleMouseLeave = (e: React.MouseEvent, item: GridItem) => {
    if (scaleOnHover) gsap.to(`[data-key="${item.id}"]`, { scale: 1, duration: 0.3, ease: 'power2.out' });
    if (colorShiftOnHover) { const ov = (e.currentTarget as HTMLElement).querySelector('.masonry-overlay') as HTMLElement; if (ov) gsap.to(ov, { opacity: 0, duration: 0.3 }); }
  };

  const totalHeight = grid.reduce((max, item) => Math.max(max, item.y + item.h), 0);

  return (
    <div ref={containerRef} className="masonry-list" style={{ height: totalHeight > 0 ? totalHeight : 'auto' }}>
      {grid.map(item => (
        <div key={item.id} data-key={item.id} className="masonry-item-wrapper"
          onClick={() => window.open(item.url, '_blank', 'noopener')}
          onMouseEnter={e => handleMouseEnter(e, item)}
          onMouseLeave={e => handleMouseLeave(e, item)}
        >
          <div className="masonry-item-img" style={{ backgroundImage: `url(${item.img})` }}>
            {colorShiftOnHover && <div className="masonry-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg,rgba(201,169,110,0.4),rgba(0,0,0,0.4))', opacity: 0, pointerEvents: 'none', borderRadius: '10px' }} />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
