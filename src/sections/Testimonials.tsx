import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '@/lib/data';
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { cn } from '@/lib/utils';

export function Testimonials() {
  const [active, setActive] = useState(0);
  return (
    <section className="border-b border-[#1e1e1e] bg-[#111] py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <Reveal className="mb-14">
          <div className="mb-4 flex items-center gap-3"><span className="h-px w-8 bg-white/20" /><span className="text-label text-[#555]">Client voices</span></div>
          <SectionHeading text="What They Say" className="text-4xl sm:text-5xl lg:text-6xl text-[#e2e2e2]" />
        </Reveal>
        <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
          <Stagger className="flex flex-row gap-5 lg:flex-col">
            {testimonials.map((t, i) => (
              <StaggerItem key={t.id}>
                <button onClick={() => setActive(i)} className={cn('w-full border-l-2 px-4 py-4 text-left transition-all duration-300', i === active ? 'border-[#e2e2e2] bg-[#0a0a0a]' : 'border-transparent hover:border-[#333] hover:bg-[#0d0d0d]')}>
                  <p className={cn('text-sm font-medium transition-colors', i === active ? 'text-[#e2e2e2]' : 'text-[#555]')}>{t.author.split('&')[0].trim()}</p>
                  <p className="mt-0.5 font-mono text-[10px] text-[#333]">{t.project}</p>
                </button>
              </StaggerItem>
            ))}
          </Stagger>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <blockquote className="mb-8 font-display text-2xl italic leading-snug text-[#e2e2e2] sm:text-3xl lg:text-4xl">"{testimonials[active].quote}"</blockquote>
              <footer className="text-sm text-[#444]">— {testimonials[active].author}, <span className="text-[#333]">{testimonials[active].project}</span></footer>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
