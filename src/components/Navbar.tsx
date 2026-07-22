import { PillNav } from '@/components/PillNav';
import { MobileMenu } from '@/components/MobileMenu';
import { Logo } from '@/components/Logo';
import { navLinks } from '@/lib/data';

const pillItems = navLinks.map((l) => ({ label: l.label, href: l.href }));
const menuItems = navLinks.map((l) => ({ label: l.label, link: l.href }));
const socialItems = [
  { label: 'Instagram', link: '#' },
  { label: 'LinkedIn', link: '#' },
  { label: 'Pinterest', link: '#' },
];

export function Navbar() {
  return (
    <>
      {/* Desktop nav — centred pill with a subtle "on this page" label */}
      <div className="fixed inset-x-0 top-5 z-50 hidden flex-col items-center gap-1.5 md:flex">
        <PillNav items={pillItems} />
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#2a2a2a]">Sections on this page</p>
      </div>
      {/* Logo top-left */}
      <div className="fixed left-8 top-4 z-50 hidden md:block">
        <a href="#top" className="opacity-60 transition-opacity hover:opacity-100">
          <Logo height={30} color="#6b6b6b" />
        </a>
      </div>
      {/* Mobile */}
      <div className="md:hidden">
        <MobileMenu items={menuItems} socialItems={socialItems} />
      </div>
    </>
  );
}
