'use client';

import PillNav from '@/components/bits/PillNav';
import { StaggeredMenu } from '@/components/bits/StaggeredMenu';
import { navLinks } from '@/lib/data';

const pillItems = navLinks.map((l) => ({ label: l.label, href: l.href }));

const staggerItems = navLinks.map((l) => ({
  label: l.label,
  ariaLabel: l.label,
  link: l.href,
}));

const socialItems = [
  { label: 'Instagram', link: '#' },
  { label: 'LinkedIn', link: '#' },
  { label: 'Pinterest', link: '#' },
];

export function Navbar() {
  return (
    <>
      {/* Desktop: centered PillNav */}
      <div className="fixed inset-x-0 top-5 z-50 hidden justify-center md:flex">
        <PillNav
          items={pillItems}
          baseColor="#0a0a0a"
          pillColor="#141414"
          hoveredPillTextColor="#0a0a0a"
          pillTextColor="#787060"
          ease="power3.out"
          initialLoadAnimation={true}
        />
      </div>

      {/* Mobile: StaggeredMenu fixed overlay */}
      <div className="md:hidden">
        <StaggeredMenu
          isFixed={true}
          position="right"
          items={staggerItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          colors={['#1a1208', '#C9A96E']}
          menuButtonColor="#C9A96E"
          openMenuButtonColor="#0a0a0a"
          accentColor="#C9A96E"
          changeMenuColorOnOpen={true}
        />
      </div>
    </>
  );
}
