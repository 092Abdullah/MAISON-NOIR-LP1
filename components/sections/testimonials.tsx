'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { testimonials } from '@/lib/data';
import { Reveal } from '@/components/reveal';
import { cn } from '@/lib/utils';

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const count = testimonials.length;

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((prev) => (prev + dir + count) % count);
    },
    [count]
  );

  useEffect(() => {
    const id = setInterval(() => go(1), 7000);
    return () => clearInterval(id);
  }, [go, index]);

  const current = testimonials[index];

  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-card/30 py-24 sm:py-32">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <div className="container-mw container-px relative">
        <div className="mb-14 text-center">
          <Reveal>
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary">
                Kind words
              </span>
              <span className="h-px w-10 bg-primary" />
            </div>
            <h2 className="font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              What our clients say.
            </h2>
          </Reveal>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <Quote className="mx-auto mb-8 h-10 w-10 text-primary/40" />

          <div className="relative min-h-[220px] sm:min-h-[180px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <p className="text-pretty font-display text-2xl font-medium leading-snug text-foreground sm:text-3xl">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <footer className="mt-8 flex flex-col items-center gap-1">
                  <div className="font-medium text-foreground">{current.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {current.role} · {current.location}
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    i === index
                      ? 'w-8 bg-primary'
                      : 'w-1.5 bg-border hover:bg-foreground/40'
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
