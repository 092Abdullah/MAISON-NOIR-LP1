'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, MoveHorizontal } from 'lucide-react';
import { transformations } from '@/lib/data';
import { Reveal } from '@/components/reveal';
import { cn } from '@/lib/utils';

type BeforeAfterSliderProps = {
  before: string;
  after: string;
  label?: string;
};

function BeforeAfterSlider({ before, after }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [updateFromClientX]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl border border-border bg-card"
      onPointerDown={(e) => {
        draggingRef.current = true;
        updateFromClientX(e.clientX);
      }}
    >
      {/* Before image (base) */}
      <img
        src={before}
        alt="Before"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute left-4 top-4 z-20 rounded-full bg-background/70 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-foreground backdrop-blur">
        Before
      </span>

      {/* After image (clipped overlay) */}
      <div
        className="absolute inset-0 z-10 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={after}
          alt="After"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: `${(100 / position) * 100}%`, maxWidth: 'none' }}
        />
        <span className="absolute right-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-primary-foreground backdrop-blur">
          After
        </span>
      </div>

      {/* Handle */}
      <div
        className="absolute inset-y-0 z-30 flex w-0 items-center justify-center"
        style={{ left: `${position}%` }}
      >
        <div className="absolute inset-y-0 -left-px w-0.5 bg-foreground/80 shadow-[0_0_20px_rgba(0,0,0,0.5)]" />
        <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-lg backdrop-blur">
          <MoveHorizontal className="h-4 w-4" />
        </div>
      </div>

      {/* Hint */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-background/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-foreground/70 backdrop-blur">
        Drag to compare
      </div>
    </div>
  );
}

export function BeforeAfter() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const count = transformations.length;

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((prev) => (prev + dir + count) % count);
    },
    [count]
  );

  const current = transformations[index];

  return (
    <section
      id="transformations"
      className="relative scroll-mt-24 border-b border-border/60 bg-card/30 py-24 sm:py-32"
    >
      {/* Soft glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="container-mw container-px">
        {/* Header */}
        <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary">
                Transformations
              </span>
            </div>
            <h2 className="max-w-2xl font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              The before, and the after.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-pretty text-muted-foreground">
              Drag the handle on any image to see how we reworked the room — then
              move through the set to see more.
            </p>
          </Reveal>
        </div>

        {/* Carousel */}
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16">
          <div className="relative">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <BeforeAfterSlider
                  before={current.before}
                  after={current.after}
                />
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {transformations.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    aria-label={`Go to ${t.title}`}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-300',
                      i === index
                        ? 'w-8 bg-primary'
                        : 'w-1.5 bg-border hover:bg-foreground/40'
                    )}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous transformation"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next transformation"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Detail */}
          <div className="lg:pl-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  <span className="text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px w-6 bg-border" />
                  <span>{String(count).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-5 font-display text-4xl font-medium text-foreground">
                  {current.title}
                </h3>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  {current.location}
                </p>
                <p className="mt-6 text-pretty leading-relaxed text-foreground/80">
                  {current.note}
                </p>
                <a
                  href="#contact"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground"
                >
                  Start your transformation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
