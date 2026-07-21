'use client';
import React, { useRef, useEffect, useCallback } from 'react';

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  extraScale?: number;
  children?: React.ReactNode;
}
interface Spark { x: number; y: number; angle: number; startTime: number; }

const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = '#C9A96E',
  sparkSize = 10,
  sparkRadius = 22,
  sparkCount = 8,
  duration = 500,
  easing = 'ease-out',
  extraScale = 1.0,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    let t: ReturnType<typeof setTimeout>;
    const resize = () => { const { width, height } = parent.getBoundingClientRect(); canvas.width = width; canvas.height = height; };
    const ro = new ResizeObserver(() => { clearTimeout(t); t = setTimeout(resize, 80); });
    ro.observe(parent);
    resize();
    return () => { ro.disconnect(); clearTimeout(t); };
  }, []);

  const ease = useCallback((t: number) => {
    switch (easing) {
      case 'linear': return t;
      case 'ease-in': return t * t;
      case 'ease-in-out': return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default: return t * (2 - t);
    }
  }, [easing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let id: number;
    const draw = (ts: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = ts - spark.startTime;
        if (elapsed >= duration) return false;
        const progress = elapsed / duration;
        const eased = ease(progress);
        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);
        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);
        ctx.globalAlpha = 1 - eased;
        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        ctx.globalAlpha = 1;
        return true;
      });
      id = requestAnimationFrame(draw);
    };
    id = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(id);
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, ease, extraScale]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = performance.now();
    sparksRef.current.push(...Array.from({ length: sparkCount }, (_, i) => ({ x, y, angle: (2 * Math.PI * i) / sparkCount, startTime: now })));
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }} onClick={handleClick}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 9999 }} />
      {children}
    </div>
  );
};

export default ClickSpark;
