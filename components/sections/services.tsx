'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { services } from '@/lib/data';
import { Reveal } from '@/components/reveal';
import { cn } from '@/lib/utils';

export function Services() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section
      id="services"
      className="relative scroll-mt-24 border-b border-border/60 bg-background py-24 sm:py-32"
    >
      <div className="container-mw container-px">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary">
                What we do
              </span>
            </div>
            <h2 className="max-w-2xl font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              A studio for every stage of a space.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-pretty text-muted-foreground">
              From the first sketch to the final styled install, we cover every
              discipline a finished interior requires — under one roof.
            </p>
          </Reveal>
        </div>

        {/* Interactive list */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left: list */}
          <ul className="flex flex-col">
            {services.map((service, i) => {
              const isActive = i === active;
              const Icon = service.icon;
              return (
                <li key={service.id}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={cn(
                      'group flex w-full items-center gap-5 border-b border-border/60 py-6 text-left transition-colors',
                      isActive && 'border-primary/40'
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500',
                        isActive
                          ? 'border-primary/50 bg-primary/10 text-primary'
                          : 'border-border text-muted-foreground group-hover:border-foreground/30 group-hover:text-foreground'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <h3
                        className={cn(
                          'font-display text-2xl font-medium transition-colors sm:text-3xl',
                          isActive
                            ? 'text-foreground'
                            : 'text-muted-foreground group-hover:text-foreground'
                        )}
                      >
                        {service.title}
                      </h3>
                      <p className="mt-1 hidden text-sm text-muted-foreground sm:block">
                        {service.blurb}
                      </p>
                    </div>
                    <ArrowUpRight
                      className={cn(
                        'h-5 w-5 shrink-0 transition-all duration-500',
                        isActive
                          ? 'rotate-0 text-primary opacity-100'
                          : '-rotate-12 text-muted-foreground opacity-0 group-hover:opacity-60'
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right: detail panel */}
          <div className="relative hidden overflow-hidden rounded-2xl border border-border bg-card/50 p-8 lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full flex-col"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <current.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-3xl font-medium text-foreground">
                  {current.title}
                </h3>
                <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                  {current.description}
                </p>
                <div className="mt-8 border-t border-border/60 pt-6">
                  <p className="mb-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Deliverables
                  </p>
                  <ul className="grid grid-cols-2 gap-3">
                    {current.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-center gap-2 text-sm text-foreground/90"
                      >
                        <Check className="h-4 w-4 shrink-0 text-primary" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
