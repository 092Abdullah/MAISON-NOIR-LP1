import { useEffect, useRef } from 'react';
import ScrollReveal from 'scrollreveal';
interface Props { text: string; as?: 'h1' | 'h2' | 'h3'; className?: string; }
export function SectionHeading({ text, as: Tag = 'h2', className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const words = containerRef.current.querySelectorAll<HTMLSpanElement>('.sr-word');
    words.forEach((word, i) => {
      ScrollReveal().reveal(word, { origin: 'bottom', distance: '24px', duration: 650, delay: i * 70, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', opacity: 0, reset: false });
    });
  }, [text]);
  return (
    <div ref={containerRef}>
      <Tag className={`flex flex-wrap gap-x-[0.3em] gap-y-1 font-display leading-tight tracking-tight ${className}`}>
        {text.split(' ').map((word, i) => (
          <span key={i} className="sr-word inline-block" style={{ willChange: 'transform, opacity' }}>{word}</span>
        ))}
      </Tag>
    </div>
  );
}
