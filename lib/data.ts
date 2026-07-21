import {
  Sofa,
  Ruler,
  Lightbulb,
  Palette,
  TreePalm,
  Building2,
  type LucideIcon,
} from 'lucide-react';

export type Service = {
  id: string;
  title: string;
  blurb: string;
  description: string;
  icon: LucideIcon;
  deliverables: string[];
};

export const services: Service[] = [
  {
    id: 'residential',
    title: 'Residential Interiors',
    blurb: 'Homes that feel personal, warm, and quietly sophisticated.',
    description:
      'Full-home design and styling for apartments, townhouses, and estates — built around the way you actually live.',
    icon: Sofa,
    deliverables: ['Concept & mood boards', 'Space planning', 'FF&E sourcing', 'Styling & install'],
  },
  {
    id: 'commercial',
    title: 'Commercial Spaces',
    blurb: 'Workplaces and hospitality that leave a lasting impression.',
    description:
      'Offices, restaurants, and boutique retail designed to balance brand expression with everyday function.',
    icon: Building2,
    deliverables: ['Brand-led concept', 'Workspace flow', 'Custom joinery', 'Lighting design'],
  },
  {
    id: 'spatial',
    title: 'Spatial Planning',
    blurb: 'Layouts that maximize flow, light, and proportion.',
    description:
      'Before a single wall moves, we test the geometry of your space to ensure every square foot earns its place.',
    icon: Ruler,
    deliverables: ['Measured plans', 'Zoning studies', 'Furniture layouts', '3D walkthroughs'],
  },
  {
    id: 'lighting',
    title: 'Lighting Design',
    blurb: 'Layered light that shapes mood from morning to night.',
    description:
      'A tailored lighting plan — architectural, task, and ambient — that brings texture and depth to every room.',
    icon: Lightbulb,
    deliverables: ['Lighting concept', 'Fixture spec', 'Dimming scenes', 'Installation detail'],
  },
  {
    id: 'color',
    title: 'Color & Material',
    blurb: 'Palettes grounded in texture, tone, and longevity.',
    description:
      'We develop color stories and material libraries that age gracefully and feel cohesive across the whole home.',
    icon: Palette,
    deliverables: ['Material library', 'Finish schedule', 'Color strategy', 'Sample box'],
  },
  {
    id: 'outdoor',
    title: 'Outdoor Design',
    blurb: 'Terraces and gardens that extend the interior out.',
    description:
      'From rooftop terraces to courtyard gardens, we design outdoor rooms that feel like a natural continuation indoors.',
    icon: TreePalm,
    deliverables: ['Outdoor concept', 'Planting plan', 'Furniture spec', 'Lighting'],
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  image: string;
  description: string;
};

export const projects: Project[] = [
  {
    id: 'atelier-loft',
    title: 'Atelier Loft',
    category: 'Residential',
    location: 'New York, NY',
    year: '2024',
    image:
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'A converted artist\'s loft reimagined as a warm, light-filled family home.',
  },
  {
    id: 'maison-verte',
    title: 'Maison Verte',
    category: 'Residential',
    location: 'Paris, FR',
    year: '2024',
    image:
      'https://images.pexels.com/photos/501347/pexels-photo-501347.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'A Haussmannian apartment layered with limewash, oak, and hand-loomed textiles.',
  },
  {
    id: 'casa-luma',
    title: 'Casa Luma',
    category: 'Residential',
    location: 'Lisbon, PT',
    year: '2023',
    image:
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'A hillside villa where plaster walls meet travertine and soft Mediterranean light.',
  },
  {
    id: 'nordic-house',
    title: 'Nordic House',
    category: 'Residential',
    location: 'Copenhagen, DK',
    year: '2023',
    image:
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'A pared-back family home in pale oak, wool, and chalk-white plaster.',
  },
  {
    id: 'the-embassy',
    title: 'The Embassy',
    category: 'Commercial',
    location: 'London, UK',
    year: '2024',
    image:
      'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'A members\' club dressed in walnut, brass, and deep teal mohair.',
  },
  {
    id: 'oak-bar',
    title: 'The Oak Bar',
    category: 'Hospitality',
    location: 'Amsterdam, NL',
    year: '2023',
    image:
      'https://images.pexels.com/photos/1578259/pexels-photo-1578259.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'A neighbourhood wine bar with a monolithic oak counter and candle-lit alcoves.',
  },
];

export type BeforeAfter = {
  id: string;
  title: string;
  location: string;
  before: string;
  after: string;
  note: string;
};

export const transformations: BeforeAfter[] = [
  {
    id: 'living-room',
    title: 'The Living Room',
    location: 'Brooklyn Heights, NY',
    before:
      'https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&w=1400',
    after:
      'https://images.pexels.com/photos/6964013/pexels-photo-6964013.jpeg?auto=compress&cs=tinysrgb&w=1400',
    note: 'We opened the rear wall, swapped overhead fluorescents for a sculptural pendant, and grounded the room in walnut and bouclé.',
  },
  {
    id: 'kitchen',
    title: 'The Kitchen',
    location: 'Notting Hill, London',
    before:
      'https://images.pexels.com/photos/6193968/pexels-photo-6193968.jpeg?auto=compress&cs=tinysrgb&w=1400',
    after:
      'https://images.pexels.com/photos/6758796/pexels-photo-6758796.jpeg?auto=compress&cs=tinysrgb&w=1400',
    note: 'A galley kitchen became a sculptural oak island with integrated brass shelving and a slab backsplash.',
  },
  {
    id: 'bedroom',
    title: 'The Primary Suite',
    location: 'Le Marais, Paris',
    before:
      'https://images.pexels.com/photos/6194108/pexels-photo-6194108.jpeg?auto=compress&cs=tinysrgb&w=1400',
    after:
      'https://images.pexels.com/photos/6585578/pexels-photo-6585578.jpeg?auto=compress&cs=tinysrgb&w=1400',
    note: 'Limewashed walls, a low linen platform, and a reading niche turned a boxy bedroom into a retreat.',
  },
  {
    id: 'dining',
    title: 'The Dining Room',
    location: 'Tribeca, NY',
    before:
      'https://images.pexels.com/photos/6211093/pexels-photo-6211093.jpeg?auto=compress&cs=tinysrgb&w=1400',
    after:
      'https://images.pexels.com/photos/6449893/pexels-photo-6449893.jpeg?auto=compress&cs=tinysrgb&w=1400',
    note: 'A forgotten pass-through became a candle-lit dining room with a travertine table and a vaulted oak ceiling.',
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We start with a conversation about how you live, what you love, and the rhythms of your day. A site survey and brief set the foundation.',
  },
  {
    number: '02',
    title: 'Concept',
    description:
      'Mood, material, and light come together in a concept presentation — paired with plans, 3D views, and a clear narrative for the space.',
  },
  {
    number: '03',
    title: 'Design Development',
    description:
      'We refine layouts, specify finishes and fixtures, and build a documented package ready for tender and construction.',
  },
  {
    number: '04',
    title: 'Procurement',
    description:
      'Our team sources, orders, and tracks every piece — from custom joinery to the last throw pillow — so nothing slips through the cracks.',
  },
  {
    number: '05',
    title: 'Install',
    description:
      'We style, hang art, tune the lighting, and hand you the keys to a finished home. Then we follow up to make sure it lives as well as it looks.',
  },
];

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
};

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote:
      'They listened more than they spoke, and the result is a home that feels unmistakably ours. Every material was chosen with intention.',
    name: 'Eleanor Voss',
    role: 'Homeowner',
    location: 'Brooklyn, NY',
  },
  {
    id: '2',
    quote:
      'Our office went from a generic floor plate to a place people actively want to come to. The impact on culture was immediate.',
    name: 'Marcus Hale',
    role: 'Founder, Hale & Co.',
    location: 'London, UK',
  },
  {
    id: '3',
    quote:
      'The before-and-after is one thing on paper, but living in it is another. The light alone changed how our family gathers.',
    name: 'Sofia Renard',
    role: 'Homeowner',
    location: 'Paris, FR',
  },
  {
    id: '4',
    quote:
      'Calm, organized, and genuinely creative under pressure. They delivered a complex restaurant build on time and on budget.',
    name: 'Daniel Okafor',
    role: 'Owner, The Oak Bar',
    location: 'Amsterdam, NL',
  },
];

export type Stat = {
  value: string;
  label: string;
};

export const stats: Stat[] = [
  { value: '12+', label: 'Years in practice' },
  { value: '180', label: 'Projects delivered' },
  { value: '40', label: 'Cities worldwide' },
  { value: '9', label: 'Industry awards' },
];

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Transformations', href: '#transformations' },
  { label: 'Studio', href: '#studio' },
  { label: 'Contact', href: '#contact' },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: 'Where is the studio based, and do you take on remote projects?',
    answer:
      'We are based in New York with a satellite studio in Paris. We take on projects globally and have delivered work across 40 cities — for remote clients we run the process through video walkthroughs, 3D models, and shipped sample boxes.',
  },
  {
    question: 'What is a typical project timeline?',
    answer:
      'A full residential engagement runs six to fourteen months from concept to install, depending on scope and custom fabrication. Commercial projects often move faster — typically three to six months.',
  },
  {
    question: 'Do you work with existing furniture and pieces we love?',
    answer:
      'Almost always. We see heirlooms and collected pieces as the soul of a home. We build the design around what matters to you and complement it with new work.',
  },
  {
    question: 'How is your fee structured?',
    answer:
      'We work on a fixed design fee paired with a transparent procurement margin. You see every trade quote and invoice — no hidden markups. A detailed proposal is shared after the discovery call.',
  },
  {
    question: 'Can you collaborate with our architect or contractor?',
    answer:
      'Yes. We frequently join a project team mid-stream and coordinate closely with architects, builders, and trades to make sure design intent is carried through construction.',
  },
];
