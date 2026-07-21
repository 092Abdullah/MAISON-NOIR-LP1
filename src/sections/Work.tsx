import { useState } from 'react';
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
  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="border-b border-[#1e1e1e] bg-[#0a0a0a]">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
        <Reveal>
          <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3"><span className="h-px w-8 bg-white/20" /><span className="text-label text-[#555]">Our portfolio</span></div>
              <SectionHeading text="All Work" className="text-4xl sm:text-5xl lg:text-6xl text-[#e2e2e2]" />
            </div>
            <div className="flex items-center gap-1 border border-[#1e1e1e] p-1">
              {FILTERS.map((f) => (
                <button key={f} onClick={() => setActive(f)} className={cn('relative px-5 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors', active === f ? 'text-[#0a0a0a]' : 'text-[#555] hover:text-[#888]')}>
                  {active === f && <motion.span layoutId="filter-pill" className="absolute inset-0 bg-[#e2e2e2]" transition={{ type: 'spring', stiffness: 400, damping: 35 }} />}
                  <span className="relative z-10">{f}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <Stagger className="grid grid-cols-1 gap-px bg-[#1e1e1e] md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project) => (
                <StaggerItem key={project.id}>
                  <div className="group relative aspect-[4/5] overflow-hidden bg-[#0a0a0a]">
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 flex flex-col justify-end bg-[#0a0a0a]/70 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="mb-2 font-mono text-[9px] uppercase tracking-[0.25em] text-[#888]">{project.category} · {project.location}</span>
                      <h3 className="mb-4 font-display text-xl leading-tight text-[#e2e2e2]">{project.title}</h3>
                      <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#e2e2e2]">View project <ArrowUpRight size={14} strokeWidth={1.5} /></span>
                    </div>
                    <span className="absolute left-4 top-4 border border-[#1e1e1e] bg-[#0a0a0a]/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#666] transition-opacity group-hover:opacity-0">{project.category}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            {filtered.length === 0 && <p className="py-24 text-center font-mono text-sm text-[#444]">No projects in this category yet.</p>}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
