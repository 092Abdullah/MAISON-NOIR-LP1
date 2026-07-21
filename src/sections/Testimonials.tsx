import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '@/lib/data';
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { cn } from '@/lib/utils';

export function Testimonials() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  return (
    <section className="border-b border-[#1e1e1e] bg-[#111]">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
        <Reveal>
          <div className="mb-4 flex items-center gap-3"><span className="h-px w-8 bg-white/20" /><span className="text-label text-[#555]">Client voices</span></div>
          <SectionHeading text="What They Say" className="mb-16 text-4xl sm:text-5xl lg:text-6xl text-[#e2e2e2]" />
        </Reveal>
        <div className="grid gap-12 lg:grid-cols-[280px_1fr] xl:gap-20">
          {/* Selector */}
          <Stagger className="flex flex-col gap-1">
            {testimonials.map((t, i) => (
              <StaggerItem key={t.id}>
                <button onClick={() => setActive(i)} className={cn('w-full border-l-2 px-4 py-4 text-left transition-all duration-300', i === active ? 'border-[#e2e2e2] bg-[#0a0a0a]' : 'border-transparent hover:border-[#333] hover:bg-[#0d0d0d]')}>
                  <p className={cn('text-sm font-medium transition-colors', i === active ? 'text-[#e2e2e2]' : 'text-[#555]')}>{t.author.split('&')[0].trim()}</p>
                  <p className="mt-0.5 font-mono text-[10px] text-[#333]">{t.project}</p>
                </button>
              </StaggerItem>
            ))}
          </Stagger>
          {/* Quote */}
          <div className="flex min-h-[280px] flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={current.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
                <blockquote className="mb-8 max-w-2xl font-display text-[clamp(1.25rem,2.5vw,2rem)] italic leading-snug text-[#e2e2e2]">"{current.quote}"</blockquote>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm font-medium text-[#e2e2e2]">{current.author}</p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-[#444]">{current.project}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-10 flex items-center gap-2 border-t border-[#1e1e1e] pt-8">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} aria-label={`Testimonial ${i + 1}`} className={cn('h-0.5 rounded-full transition-all duration-300', i === active ? 'w-6 bg-[#e2e2e2]' : 'w-2 bg-[#333] hover:bg-[#555]')} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
