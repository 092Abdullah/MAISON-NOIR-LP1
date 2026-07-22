import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import type { Project } from '@/lib/data';
import { cn } from '@/lib/utils';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export function ProjectModal({ project, onClose, onPrev, onNext, hasPrev, hasNext }: ProjectModalProps) {
  const [activeImg, setActiveImg] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset image index when project changes
  useEffect(() => { setActiveImg(0); }, [project?.id]);

  // Lock body scroll while open; handle keyboard
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose, onPrev, onNext, hasPrev, hasNext]);

  // Scroll content area to top on project change
  useEffect(() => { scrollRef.current?.scrollTo({ top: 0 }); }, [project?.id]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a]/95 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-4 overflow-hidden rounded-2xl border border-[#1e1e1e] bg-[#0d0d0d] sm:inset-6 lg:inset-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header bar ── */}
            <div className="flex items-center justify-between border-b border-[#1e1e1e] px-6 py-4 sm:px-8">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#333]">{project.category}</span>
                <span className="h-px w-4 bg-[#2a2a2a]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#333]">{project.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onPrev}
                  disabled={!hasPrev}
                  aria-label="Previous project"
                  className={cn('flex h-8 w-8 items-center justify-center rounded-full border transition-all', hasPrev ? 'border-[#2a2a2a] text-[#666] hover:border-[#555] hover:text-[#e2e2e2]' : 'border-[#1e1e1e] text-[#2a2a2a] cursor-default')}
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={onNext}
                  disabled={!hasNext}
                  aria-label="Next project"
                  className={cn('flex h-8 w-8 items-center justify-center rounded-full border transition-all', hasNext ? 'border-[#2a2a2a] text-[#666] hover:border-[#555] hover:text-[#e2e2e2]' : 'border-[#1e1e1e] text-[#2a2a2a] cursor-default')}
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <div className="mx-2 h-4 w-px bg-[#1e1e1e]" />
                <button onClick={onClose} aria-label="Close" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2a2a2a] text-[#666] transition-all hover:border-[#555] hover:text-[#e2e2e2]">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* ── Scrollable body ── */}
            <div ref={scrollRef} className="h-[calc(100%-57px)] overflow-y-auto">
              <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px]">

                {/* Left — imagery */}
                <div className="border-b border-[#1e1e1e] lg:border-b-0 lg:border-r">
                  {/* Hero image */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeImg}
                        src={project.gallery[activeImg]}
                        alt={project.title}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full w-full object-cover"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <p className="font-display text-2xl text-white sm:text-3xl">{project.title}</p>
                      <p className="mt-1 text-sm text-white/60">{project.location}</p>
                    </div>
                  </div>
                  {/* Thumbnail strip */}
                  <div className="flex gap-2 border-t border-[#1e1e1e] p-3">
                    {project.gallery.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        className={cn('relative overflow-hidden rounded-lg transition-all duration-300', i === activeImg ? 'ring-1 ring-white/60' : 'opacity-40 hover:opacity-70')}
                        style={{ width: '22%', aspectRatio: '4/3' }}
                        aria-label={`View image ${i + 1}`}
                      >
                        <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right — case study text */}
                <div className="flex flex-col px-6 py-8 sm:px-8 sm:py-10">
                  {/* Tags */}
                  <div className="mb-8 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-[#2a2a2a] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[#555]">{tag}</span>
                    ))}
                  </div>

                  {/* Summary */}
                  <p className="mb-6 font-display text-lg italic leading-relaxed text-[#a8a8a8] sm:text-xl">{project.description}</p>

                  <div className="mb-8 h-px w-12 bg-[#2a2a2a]" />

                  {/* Design narrative */}
                  <p className="flex-1 text-sm leading-[1.85] text-[#555]">{project.details}</p>

                  {/* CTA */}
                  <div className="mt-10 border-t border-[#1e1e1e] pt-8">
                    <p className="mb-4 text-sm text-[#444]">Interested in a similar project?</p>
                    <a
                      href="#contact"
                      onClick={onClose}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-white/90"
                    >
                      Start a conversation →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
