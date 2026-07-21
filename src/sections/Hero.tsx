import { motion } from 'framer-motion';

const HERO_MAIN = 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1400';
const HERO_THUMB = 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600';
const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
});

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-[#0a0a0a]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.025]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }}
      />
      <div className="relative z-20 mx-auto grid min-h-[100svh] max-w-[1440px] grid-cols-1 items-center px-5 sm:px-8 lg:grid-cols-2 lg:px-14">
        {/* Left */}
        <div className="flex flex-col justify-center pb-12 pt-28 lg:pb-20 lg:pt-0 lg:pr-16">
          <motion.div {...fadeUp(0.1)} className="mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-[#444]" />
            <span className="text-label text-[#555]">Interior Design Studio — Est. 2013</span>
          </motion.div>
          <h1 className="mb-8 font-display leading-[0.92] tracking-tight text-[#e2e2e2]" style={{ fontSize: 'clamp(3.2rem, 6.5vw, 6rem)' }}>
            <motion.span {...fadeUp(0.18)} className="block">Spaces</motion.span>
            <motion.span {...fadeUp(0.27)} className="block italic text-[#888]">crafted to</motion.span>
            <motion.span {...fadeUp(0.36)} className="block">endure.</motion.span>
          </h1>
          <motion.p {...fadeUp(0.5)} className="mb-10 max-w-md text-[0.9375rem] leading-[1.7] text-[#555]">
            A full-service studio working at the intersection of architecture and life — creating homes that feel effortlessly composed from the very first visit.
          </motion.p>
          <motion.div {...fadeUp(0.62)} className="flex flex-wrap items-center gap-3">
            <a href="#work" className="group inline-flex items-center gap-2.5 rounded-full bg-[#e2e2e2] px-7 py-3.5 text-sm font-semibold text-black transition-all hover:bg-white">
              View our work <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a href="#contact" className="inline-flex items-center gap-2.5 rounded-full border border-[#2a2a2a] px-7 py-3.5 text-sm font-medium text-[#888] transition-all hover:border-[#555] hover:text-[#e2e2e2]">
              Book a consult
            </a>
          </motion.div>
          <motion.div {...fadeUp(0.74)} className="mt-14 flex items-center gap-8 border-t border-[#1a1a1a] pt-8">
            {[{ v: '180+', l: 'Projects' }, { v: '12', l: 'Years' }, { v: '24', l: 'Awards' }].map((s) => (
              <div key={s.l}>
                <p className="font-display text-2xl text-[#e2e2e2]">{s.v}</p>
                <p className="mt-0.5 text-label text-[#444]">{s.l}</p>
              </div>
            ))}
            <div className="ml-auto hidden sm:block"><span className="text-label text-[#2a2a2a]">New York · Paris</span></div>
          </motion.div>
        </div>
        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.15 }}
          className="relative hidden h-[100svh] lg:flex lg:items-center"
        >
          <div className="relative h-[88vh] w-full overflow-hidden rounded-2xl">
            <img src={HERO_MAIN} alt="Green Haven Villa" fetchPriority="high" loading="eager" decoding="sync" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.9 }} className="absolute bottom-[7%] left-[-5%] z-30 min-w-[200px] rounded-2xl border border-white/10 bg-black/70 p-5 backdrop-blur-md">
            <p className="text-label text-[#555]">Currently featured</p>
            <p className="mt-1.5 font-display text-lg leading-tight text-[#e2e2e2]">Green Haven<br />Villa</p>
            <div className="mt-3 flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /><span className="text-xs text-[#555]">Malibu, California</span></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 1.05 }} className="absolute right-[-4%] top-[10%] z-30 rounded-2xl border border-white/10 bg-black/70 px-5 py-4 backdrop-blur-md">
            <p className="text-label text-[#555]">Client satisfaction</p>
            <p className="mt-1.5 font-display text-3xl text-[#e2e2e2]">98<span className="text-xl text-[#555]">%</span></p>
            <div className="mt-2 flex items-end gap-[3px]">
              {[55, 70, 62, 80, 75, 90, 88, 98].map((h, i) => (
                <div key={i} className="w-[5px] rounded-sm" style={{ height: h * 0.28 + 'px', background: i === 7 ? '#e2e2e2' : 'rgba(226,226,226,0.18)' }} />
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease, delay: 1.2 }} className="absolute bottom-[22%] right-[-8%] z-30 h-[180px] w-[140px] overflow-hidden rounded-xl border border-white/10 shadow-2xl">
            <img src={HERO_THUMB} alt="Noir Penthouse" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2.5 backdrop-blur-sm">
              <p className="truncate text-[10px] font-medium leading-tight text-white/90">Noir Penthouse</p>
              <p className="text-[9px] text-white/40">New York, NY</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.8 }} className="absolute bottom-6 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <motion.div animate={{ scaleY: [1, 0.3, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} className="h-9 w-px origin-top bg-gradient-to-b from-white/30 to-transparent" />
        <span className="text-label text-[#333]">Scroll</span>
      </motion.div>
    </section>
  );
}
