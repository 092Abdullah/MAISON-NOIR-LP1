import { Navbar } from '@/components/Navbar';
import { Hero } from '@/sections/Hero';
import { Stats } from '@/sections/Stats';
import { SignatureWork } from '@/sections/SignatureWork';
import { Work } from '@/sections/Work';
import { Transformations } from '@/sections/Transformations';
import { Services } from '@/sections/Services';
import { Process } from '@/sections/Process';
import { Studio } from '@/sections/Studio';
import { Testimonials } from '@/sections/Testimonials';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <Stats />
      <SignatureWork />
      <Work />
      <Transformations />
      <Services />
      <Process />
      <Studio />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
