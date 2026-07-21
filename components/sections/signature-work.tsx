'use client';

import { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/lib/data';
import { Reveal } from '@/components/reveal';
import { cn } from '@/lib/utils';

export function SignatureWork() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const animateToTarget = useCallback(() => {
    currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.1;
    currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.1;
    setImgPos({ x: currentPos.current.x, y: currentPos.current.y });
    rafRef.current = requestAnimationFrame(animateToTarget);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      targetPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    []
  );

  const handleRowEnter = (i: number) => {
    setActiveIndex(i);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animateToTarget);
  };

  const handleRowLeave = () => {
    setActiveIndex(null);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  const featured = projects.slice(0, 4);

  return (
    <section className="relative scroll-mt-24 border-b border-border/60 bg-background py-20 sm:py-28">
      <div className="container-mw container-px">
        {/* Header */}
        <Reveal>
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">Project</p>
          <h2 className="mb-10 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Our Signature Work
          </h2>
        </Reveal>

        {/* Table list */}
        <div
          ref={containerRef}
          className="relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleRowLeave}
        >
          {/* Floating preview image */}
          <AnimatePresence>
            {activeIndex !== null && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute z-30 aspect-[4/5] w-52 overflow-hidden rounded-xl border border-border/60 shadow-2xl"
                style={{
                  left: imgPos.x + 24,
                  top: imgPos.y - 120,
                  transform: 'translateY(-50%)',
                }}
              >
                <img
                  src={featured[activeIndex]?.image}
                  alt={featured[activeIndex]?.title}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* List */}
          <ul>
            {featured.map((project, i) => (
              <li key={project.id}>
                <a
                  href="#contact"
                  onMouseEnter={() => handleRowEnter(i)}
                  className={cn(
                    'group flex w-full items-center gap-6 border-t border-border/60 py-5 transition-colors duration-300 sm:gap-8',
                    activeIndex === i
                      ? 'bg-foreground/[0.04]'
                      : 'hover:bg-foreground/[0.03]'
                  )}
                >
                  {/* Number */}
                  <span
                    className={cn(
                      'w-10 shrink-0 font-display text-lg font-medium transition-colors',
                      activeIndex === i ? 'text-primary' : 'text-muted-foreground/50'
                    )}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Name */}
                  <span
                    className={cn(
                      'min-w-0 flex-1 font-display text-2xl font-medium tracking-tight transition-colors sm:text-3xl lg:text-4xl',
                      activeIndex === i ? 'text-foreground' : 'text-foreground/80'
                    )}
                  >
                    {project.title}
                  </span>

                  {/* Category — hide on small */}
                  <span className="hidden w-48 shrink-0 text-sm text-muted-foreground sm:block">
                    {project.description.split(' ').slice(0, 4).join(' ') + '…'}
                  </span>

                  {/* Location */}
                  <span className="hidden w-36 shrink-0 text-sm text-muted-foreground/60 lg:block">
                    {project.location}
                  </span>

                  {/* Arrow */}
                  <span
                    className={cn(
                      'ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                      activeIndex === i
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border/60 text-muted-foreground group-hover:border-foreground/30'
                    )}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              </li>
            ))}
            {/* Bottom border */}
            <li className="border-t border-border/60" />
          </ul>

          {/* Footer */}
          <div className="mt-8 flex justify-end">
            <a
              href="#work"
              className="group flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
            >
              See all projects
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
