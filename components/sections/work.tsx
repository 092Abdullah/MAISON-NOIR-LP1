'use client';

import { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/lib/data';
import { Reveal } from '@/components/reveal';
import { cn } from '@/lib/utils';
import type { MasonryItem } from '@/components/bits/Masonry';
import dynamic from 'next/dynamic';

const Masonry = dynamic(() => import('@/components/bits/Masonry'), { ssr: false });

const filters = ['All', 'Residential', 'Commercial', 'Hospitality'] as const;
type Filter = (typeof filters)[number];

const masonryItems: MasonryItem[] = projects.map((p, i) => ({
  id: p.id,
  img: p.image,
  url: '#contact',
  height: i % 3 === 0 ? 700 : i % 2 === 0 ? 500 : 600,
}));

export function Work() {
  const [filter, setFilter] = useState<Filter>('All');

  const filtered = useMemo(() => {
    const base = filter === 'All' ? projects : projects.filter((p) => p.category === filter);
    return base.map((p, i) => ({
      id: p.id,
      img: p.image,
      url: '#contact',
      height: i % 3 === 0 ? 700 : i % 2 === 0 ? 500 : 600,
    }));
  }, [filter]);

  const totalHeight = Math.ceil(filtered.length / 3) * 260;

  return (
    <section
      id="work"
      className="relative scroll-mt-24 border-b border-border/60 bg-background py-20 sm:py-28"
    >
      <div className="container-mw container-px">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary">Portfolio</span>
            </div>
            <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
              The full archive.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm transition-all duration-300',
                    filter === f
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Masonry grid */}
        <div style={{ minHeight: totalHeight }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ minHeight: totalHeight }}
            >
              <Masonry
                items={filtered}
                ease="power3.out"
                duration={0.6}
                stagger={0.05}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.97}
                blurToFocus={true}
                colorShiftOnHover={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
