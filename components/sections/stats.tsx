'use client';

import { Reveal, Stagger, StaggerItem } from '@/components/reveal';
import GlassSurface from '@/components/bits/GlassSurface';
import { stats } from '@/lib/data';

const press = ['Architectural Digest', 'Dezeen', 'Wallpaper*', 'Elle Decor', 'Dwell', 'Architectural Digest', 'Dezeen', 'Wallpaper*', 'Elle Decor', 'Dwell'];

export function Stats() {
  return (
    <section className="relative border-b border-border/60 bg-background py-20 sm:py-28">
      <Reveal>
        <p className="container-mw container-px mb-8 text-center text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
          As featured in
        </p>
      </Reveal>
      <div className="relative mb-20 overflow-hidden mask-fade-edges">
        <div className="flex w-max animate-marquee items-center gap-16 whitespace-nowrap">
          {press.map((name, i) => (
            <span key={i} className="font-display text-2xl font-medium text-muted-foreground/40 sm:text-3xl">
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="container-mw container-px">
        <Stagger className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <GlassSurface
                width="100%"
                height={160}
                borderRadius={16}
                backgroundOpacity={0.04}
                className="w-full"
              >
                <div className="flex w-full flex-col items-center justify-center p-6 text-center">
                  <div className="font-display text-5xl font-semibold text-primary sm:text-6xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </GlassSurface>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
