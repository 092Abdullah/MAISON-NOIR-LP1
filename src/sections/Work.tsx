import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/lib/data';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { cn } from '@/lib/utils';
const filters = ['All', 'Residential', 'Commercial', 'Hospitality'] as const;
type Filter = typeof filters[number];
export function Work() {
  const [filter, setFilter] = useState<Filter>('All');
  const filtered = useMemo(() => filter === 'All' ? projects : projects.filter((p) => p.category === filter), [filter]);
  return (
    <section id="work" className="border-b border-[#1e1e1e] bg-[#0a0a0a] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-14">
        <div className="mb-10 flex flex-col gap-6">
          <Reveal>
            <div className="mb-4 flex items-center gap-3"><span className="h-px w-8 bg-white/20" /><span className="text-label text-[#555]">Portfolio</span></div>
            <SectionHeading text="The Full Archive" className="text-4xl sm:text-5xl lg:text-6xl text-[#e2e2e2]" />
          </Reveal>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => <button key={f} onClick={() => setFilter(f)} className={cn('rounded-full border px-4 py-2 text-sm transition-all', filter === f ? 'border-[#a8a8a8] bg-white/5 text-[#e2e2e2]' : 'border-[#2a2a2a] text-[#444] hover:border-[#444] hover:text-[#e2e2e2]')}>{f}</button>)}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <a key={p.id} href="#contact" className="group overflow-hidden rounded-xl">
                  <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                      <p className="font-display text-lg text-white">{p.title}</p>
                      <p className="text-label text-white/60">{p.location}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
