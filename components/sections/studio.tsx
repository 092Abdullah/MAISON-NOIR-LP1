'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Reveal } from '@/components/reveal';

const principles = [
  {
    title: 'Materiality first',
    body: 'We start every project with a material library — stone, wood, plaster, textile — and let the palette drive every later decision.',
  },
  {
    title: 'Light as architecture',
    body: 'Natural and artificial light are treated as building materials. We shape rooms around how light moves through them across the day.',
  },
  {
    title: 'Made to be lived in',
    body: 'A space should hold up to a busy household, not just a photoshoot. Durability and comfort are designed in, never added later.',
  },
];

export function Studio() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      id="studio"
      className="relative scroll-mt-24 overflow-hidden border-b border-border/60 bg-background py-24 sm:py-32"
    >
      <div className="container-mw container-px">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Image */}
          <div
            ref={ref}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border"
          >
            <motion.img
              style={{ y }}
              src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Inside the Maison Noir studio"
              className="absolute inset-0 h-[116%] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-xl bg-background/70 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                The studio
              </p>
              <p className="mt-1 font-display text-lg text-foreground">
                40 Lispenard, New York
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <Reveal>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-10 bg-primary" />
                <span className="text-xs uppercase tracking-[0.3em] text-primary">
                  The studio
                </span>
              </div>
              <h2 className="font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
                A small team, obsessed with the details you feel.
              </h2>
              <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                Maison Noir was founded in 2013 by a group of architects and
                stylists who believed interior design had grown loud and
                trend-chasing. We took the opposite bet: quieter rooms, better
                materials, and the kind of detailing that ages well.
              </p>
            </Reveal>

            <div className="mt-12 flex flex-col gap-px overflow-hidden rounded-2xl border border-border bg-border/40">
              {principles.map((p) => (
                <Reveal key={p.title} delay={0.05}>
                  <div className="flex gap-5 bg-card/60 p-6">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <div>
                      <h3 className="font-display text-xl font-medium text-foreground">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
