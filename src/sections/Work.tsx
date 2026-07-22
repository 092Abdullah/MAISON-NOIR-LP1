import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects, type Project } from '@/lib/data';
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { ProjectModal } from '@/components/ProjectModal';
import { cn } from '@/lib/utils';

type Filter = 'All' | 'Residential' | 'Commercial' | 'Hospitality';
const FILTERS: Filter[] = ['All', 'Residential', 'Commercial', 'Hospitality'];

export function Work() {
  const [active, setActive] = useState<Filter>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const filtered = useMemo(() => active === 'All' ? projects : projects.filter((p) => p.category === active), [active]);
  const selectedIdx = selectedProject ? filtered.findIndex((p) => p.id === selectedProject.id) : -1;

  const openProject = (p: Project) => setSelectedProject(p);
  const closeProject = () => setSelectedProject(null);
  const goNext = () => { if (selectedIdx < filtered.length - 1) setSelectedProject(filtered[selectedIdx + 1]); };
  const goPrev = () => { if (selectedIdx > 0) setSelectedProject(filtered[selectedIdx - 1]); };

  return (
    <>
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
                    <button onClick={() => openProject(p)} className="group block w-full overflow-hidden rounded-xl text-left">
                      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                        <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="absolute bottom-0 left-0 right-0 translate-y-full p-5 transition-transform duration-300 group-hover:translate-y-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-display text-lg leading-tight text-white">{p.title}</p>
                              <p className="mt-1 text-label text-white/60">{p.location}</p>
                            </div>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/30 text-white/80">
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                        {/* Always-visible category pill */}
                        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/50 backdrop-blur-sm">{p.category}</span>
                      </div>
                    </button>
                  </StaggerItem>
                ))}
              </Stagger>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        onClose={closeProject}
        onPrev={goPrev}
        onNext={goNext}
        hasPrev={selectedIdx > 0}
        hasNext={selectedIdx < filtered.length - 1}
      />
    </>
  );
}
