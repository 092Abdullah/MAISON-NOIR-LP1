// Ported from https://codepen.io/JuanFuentes/full/rgXKGQ
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';

interface TextPressureProps {
  text?: string; fontFamily?: string; fontUrl?: string;
  width?: boolean; weight?: boolean; italic?: boolean; alpha?: boolean;
  flex?: boolean; stroke?: boolean; scale?: boolean;
  textColor?: string; strokeColor?: string; className?: string; minFontSize?: number;
}

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const dx = b.x - a.x; const dy = b.y - a.y; return Math.sqrt(dx * dx + dy * dy);
};
const getAttr = (d: number, max: number, min: number, mx: number) => Math.max(min, mx - Math.abs((mx * d) / max) + min);
const debounce = (fn: (...a: unknown[]) => void, ms: number) => {
  let t: ReturnType<typeof setTimeout>;
  return (...a: unknown[]) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
};

const TextPressure: React.FC<TextPressureProps> = ({
  text = 'Compressa', fontFamily = 'Roboto Flex',
  fontUrl = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap',
  width = true, weight = true, italic = true, alpha = false, flex = true,
  stroke = false, scale = false, textColor = '#FFFFFF', strokeColor = '#FF0000',
  className = '', minFontSize = 24,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);
  const chars = text.split('');

  useEffect(() => {
    const onMM = (e: MouseEvent) => { cursorRef.current = { x: e.clientX, y: e.clientY }; };
    const onTM = (e: TouchEvent) => { cursorRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
    window.addEventListener('mousemove', onMM);
    window.addEventListener('touchmove', onTM, { passive: true });
    if (containerRef.current) {
      const { left, top, width: w, height: h } = containerRef.current.getBoundingClientRect();
      mouseRef.current = { x: left + w / 2, y: top + h / 2 };
      cursorRef.current = { ...mouseRef.current };
    }
    return () => { window.removeEventListener('mousemove', onMM); window.removeEventListener('touchmove', onTM); };
  }, []);

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;
    const { width: cw, height: ch } = containerRef.current.getBoundingClientRect();
    const fs = Math.max(cw / (chars.length / 2), minFontSize);
    setFontSize(fs); setScaleY(1); setLineHeight(1);
    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const tr = titleRef.current.getBoundingClientRect();
      if (scale && tr.height > 0) { const r = ch / tr.height; setScaleY(r); setLineHeight(r); }
    });
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    const dbs = debounce(setSize, 100); dbs();
    window.addEventListener('resize', dbs);
    return () => window.removeEventListener('resize', dbs);
  }, [setSize]);

  useEffect(() => {
    let rafId: number;
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;
      if (titleRef.current) {
        const tr = titleRef.current.getBoundingClientRect();
        const maxD = tr.width / 2;
        spansRef.current.forEach((span) => {
          if (!span) return;
          const r = span.getBoundingClientRect();
          const d = dist(mouseRef.current, { x: r.x + r.width / 2, y: r.y + r.height / 2 });
          const wdth = width ? Math.floor(getAttr(d, maxD, 5, 200)) : 100;
          const wght = weight ? Math.floor(getAttr(d, maxD, 100, 900)) : 400;
          const italVal = italic ? getAttr(d, maxD, 0, 1).toFixed(2) : '0';
          const alphaVal = alpha ? getAttr(d, maxD, 0, 1).toFixed(2) : '1';
          const fvs = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
          if (span.style.fontVariationSettings !== fvs) span.style.fontVariationSettings = fvs;
          if (alpha && span.style.opacity !== alphaVal) span.style.opacity = alphaVal;
        });
      }
      rafId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha]);

  const styleEl = useMemo(() => (
    <style>{`
      @import url('${fontUrl}');
      .tp-flex { display: flex; justify-content: space-between; }
      .tp-stroke span { position: relative; color: ${textColor}; }
      .tp-stroke span::after { content: attr(data-char); position: absolute; left:0; top:0; color:transparent; z-index:-1; -webkit-text-stroke-width:3px; -webkit-text-stroke-color:${strokeColor}; }
      .tp-title { color: ${textColor}; }
    `}</style>
  ), [fontUrl, textColor, strokeColor]);

  const dynClass = ['tp-title', className, flex ? 'tp-flex' : '', stroke ? 'tp-stroke' : ''].filter(Boolean).join(' ');

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', background: 'transparent' }}>
      {styleEl}
      <h1 ref={titleRef} className={dynClass} style={{ fontFamily, textTransform: 'uppercase', fontSize, lineHeight, transform: `scale(1,${scaleY})`, transformOrigin: 'center top', margin: 0, textAlign: 'center', userSelect: 'none', whiteSpace: 'nowrap', fontWeight: 100, width: '100%' }}>
        {chars.map((char, i) => (
          <span key={i} ref={(el) => { spansRef.current[i] = el; }} data-char={char} style={{ display: 'inline-block', color: stroke ? undefined : textColor }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  );
};
export default TextPressure;
