import { Reveal, Stagger, StaggerItem } from '@/components/Reveal';
import GlassSurface from '@/components/GlassSurface';
import { stats } from '@/lib/data';
const press = ['Architectural Digest', 'Dezeen', 'Wallpaper*', 'Elle Decor', 'Dwell', 'Architectural Digest', 'Dezeen', 'Wallpaper*', 'Elle Decor', 'Dwell'];
export function Stats() {
  return (
    <section className="border-b border-[#1e1e1e] bg-[#0a0a0a] py-20 sm:py-28">
      <Reveal><p className="mb-8 text-center text-label text-[#444]">As featured in</p></Reveal>
      <div className="relative mb-20 overflow-hidden mask-fade-edges">
        <div className="flex w-max animate-marquee items-center gap-16 whitespace-nowrap">{press.map((n, i) => <span key={i} className="font-display text-2xl text-[#2a2a2a] sm:text-3xl">{n}</span>)}</div>
      </div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-14">
        <Stagger className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <GlassSurface className="w-full"><div className="flex flex-col items-center justify-center p-8 text-center"><div className="font-display text-5xl text-[#e2e2e2] sm:text-6xl">{s.value}</div><div className="mt-2 text-label text-[#444]">{s.label}</div></div></GlassSurface>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
