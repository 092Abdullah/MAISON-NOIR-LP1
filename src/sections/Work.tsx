import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/data';
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { cn } from '@/lib/utils';

type Filter = 'All' | 'Residential' | 'Commercial' | 'Hospitality';
const FILTERS: Filter[] = ['All', 'Residential', 'Commercial', 'Hospitality'];

export function Work() {
  const [active, setActive] = useState<Filter>('All');
  const filtered = useMemo(() => active === 'All' ? projects : projects.filter((p) => p.category === active), [active]);

  return (
    <section id="work" className="border-b border-[#1e1e1e] bg-[#0a0a0a] py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <Reveal>
          <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3"><span className="h-px w-8 bg-white/20" /><span className="text-label text-[#555]">Portfolio</span></div>
              <SectionHeading text="The Full Archive" className="text-4xl sm:text-5xl lg:text-6xl text-[#e2e2e2]" />
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button key={f} onClick={() => setActive(f)} className={cn('rounded-full border px-4 py-2 text-sm transition-all', active === f ? 'border-[#a8a8a8] bg-white/5 text-[#e2e2e2]' : 'border-[#2a2a2a] text-[#444] hover:border-[#444] hover:text-[#e2e2e2]')}>{f}</button>
              ))}
            </div>
          </div>
        </Reveal>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <StaggerItem key={p.id}>
                  <a href="#contact" className="group block overflow-hidden rounded-xl">
                    <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                      <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />
                      <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-display text-lg text-white">{p.title}</p>
                            <p className="text-label text-white/60">{p.location}</p>
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-white/70" />
                        </div>
                      </div>
                    </div>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
