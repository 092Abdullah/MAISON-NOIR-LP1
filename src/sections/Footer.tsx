import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Instagram, Linkedin, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  Studio: [
    { label: 'About', href: '#studio' },
    { label: 'Our Process', href: '#process' },
    { label: 'Awards', href: '#studio' },
    { label: 'Press', href: '#studio' },
    { label: 'Careers', href: '#contact' },
  ],
  Work: [
    { label: 'Residential', href: '#work' },
    { label: 'Hospitality', href: '#work' },
    { label: 'Commercial', href: '#work' },
    { label: 'Archive', href: '#work' },
  ],
  Services: [
    { label: 'Full-Service Design', href: '#services' },
    { label: 'Consultation', href: '#services' },
    { label: 'Renovation Oversight', href: '#services' },
    { label: 'Art Sourcing', href: '#services' },
  ],
  Contact: [
    { label: 'New Project', href: '#contact' },
    { label: 'General Enquiry', href: '#contact' },
    { label: 'hello@maisonnoir.com', href: 'mailto:hello@maisonnoir.com' },
    { label: 'New York', href: '#contact' },
    { label: 'Paris', href: '#contact' },
  ],
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const wordmarkInView = useInView(wordmarkRef, { once: true, margin: '-80px' });

  return (
    <footer className="overflow-hidden bg-[#0a0a0a]">

      {/* ── Top divider ────────────────────────────────────────── */}
      <div className="border-t border-[#1e1e1e]" />

      {/* ── Upper section: brand left, links right ─────────────── */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 gap-16 py-20 lg:grid-cols-[1fr_2fr] lg:py-24">

          {/* Brand column */}
          <div className="flex flex-col gap-8">
            {/* Logo wordmark */}
            <div>
              <p className="font-mono text-xs tracking-[0.25em] text-[#333] uppercase mb-2">Est. 2013</p>
              <h2 className="font-display text-3xl text-[#e2e2e2] leading-tight">Maison Noir</h2>
              <p className="mt-3 max-w-[240px] text-sm leading-relaxed text-[#444]">
                Full-service interior design studio. New York &amp; Paris.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { icon: <Instagram className="h-4 w-4" />, label: 'Instagram', href: '#' },
                { icon: <Linkedin className="h-4 w-4" />, label: 'LinkedIn', href: '#' },
                { icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0m4-8v1m0 14v1M4.93 4.93l.7.7m12.73 12.73.7.7M2 12h1m18 0h1M4.93 19.07l.7-.7M18.36 5.64l.7-.7" />
                  </svg>
                ), label: 'Pinterest', href: '#' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1e1e1e] text-[#444] transition-all hover:border-[#555] hover:text-[#e2e2e2]"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <p className="mb-3 text-xs tracking-[0.15em] uppercase text-[#333] font-mono">Newsletter</p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex overflow-hidden rounded-full border border-[#1e1e1e] bg-[#111] focus-within:border-[#444]"
              >
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm text-[#e2e2e2] outline-none placeholder:text-[#333]"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-full bg-white/5 px-4 py-2.5 text-xs font-medium text-[#a8a8a8] transition-all hover:bg-white/10 hover:text-[#e2e2e2]"
                >
                  Subscribe <ArrowUpRight className="h-3 w-3" />
                </button>
              </form>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <p className="mb-5 font-mono text-[0.65rem] tracking-[0.2em] uppercase text-[#333]">{heading}</p>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-sm text-[#555] transition-colors hover:text-[#e2e2e2]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Divider ───────────────────────────────────────────── */}
      <div className="border-t border-[#141414]" />

      {/* ── Giant wordmark ────────────────────────────────────── */}
      <div ref={wordmarkRef} className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={wordmarkInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease }}
          className="select-none px-2 py-6 sm:px-4 lg:px-6"
        >
          {/* The text is sized to viewport width so it always fills edge-to-edge */}
          <p
            className="font-display leading-[0.82] tracking-tighter text-[#161616] whitespace-nowrap"
            style={{ fontSize: 'clamp(5rem, 18vw, 22rem)' }}
          >
            Maison Noir
          </p>
        </motion.div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────── */}
      <div className="border-t border-[#141414]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-3 px-5 py-5 sm:flex-row sm:items-center sm:px-8 lg:px-14">
          <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-[#2a2a2a]">
            © {year} Maison Noir Studio, LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy', 'Terms', 'Sitemap'].map((item) => (
              <a
                key={item}
                href="#"
                className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-[#2a2a2a] transition-colors hover:text-[#555]"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
