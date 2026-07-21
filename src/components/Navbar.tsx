import PillNav from '@/components/PillNav';
import MobileMenu from '@/components/MobileMenu';
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
      {/* Desktop: centered pill nav + logo top-left */}
      <div className="fixed inset-x-0 top-5 z-50 hidden items-center justify-center md:flex">
        <PillNav items={pillItems} />
      </div>
      <div className="fixed left-8 top-4 z-50 hidden md:block">
        <a href="#top" className="opacity-60 transition-opacity hover:opacity-100">
          <Logo height={30} color="#6b6b6b" />
        </a>
      </div>

      {/* Mobile: full-screen overlay menu */}
      <div className="md:hidden">
        <MobileMenu items={menuItems} socialItems={socialItems} />
      </div>
    </>
  );
}
