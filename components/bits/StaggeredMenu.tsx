'use client';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap/dist/gsap';
import './StaggeredMenu.css';

export interface StaggeredMenuItem { label: string; ariaLabel: string; link: string; }
export interface StaggeredMenuSocialItem { label: string; link: string; }
export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  isFixed?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#1a1410', '#C9A96E'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl,
  menuButtonColor = '#C9A96E',
  openMenuButtonColor = '#0a0a0a',
  changeMenuColorOnOpen = true,
  accentColor = '#C9A96E',
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close']);
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Tween | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner) return;
      let preLayers: HTMLElement[] = [];
      if (preContainer) preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];
      preLayerElsRef.current = preLayers;
      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;
    openTlRef.current?.kill();
    closeTweenRef.current?.kill();
    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
    const offscreen = position === 'left' ? -100 : 100;
    const tl = gsap.timeline({ paused: true });
    layers.forEach((ls, i) => tl.fromTo(ls, { xPercent: offscreen }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07));
    const lastTime = layers.length ? (layers.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + 0.08;
    tl.fromTo(panel, { xPercent: offscreen }, { xPercent: 0, duration: 0.65, ease: 'power4.out' }, panelInsertTime);
    if (itemEls.length) tl.to(itemEls, { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1 } }, panelInsertTime + 0.1);
    if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, panelInsertTime + 0.3);
    if (socialLinks.length) tl.to(socialLinks, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.08 }, panelInsertTime + 0.35);
    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) { tl.eventCallback('onComplete', () => { busyRef.current = false; }); tl.play(0); }
    else busyRef.current = false;
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;
    const offscreen = position === 'left' ? -100 : 100;
    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to([...layers, panel], { xPercent: offscreen, duration: 0.32, ease: 'power3.in', overwrite: 'auto', onComplete: () => { busyRef.current = false; } });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current; if (!icon) return;
    spinTweenRef.current?.kill();
    spinTweenRef.current = gsap.to(icon, { rotate: opening ? 225 : 0, duration: opening ? 0.8 : 0.35, ease: 'power4.out', overwrite: 'auto' });
  }, []);

  const animateColor = useCallback((opening: boolean) => {
    const btn = toggleBtnRef.current; if (!btn) return;
    colorTweenRef.current?.kill();
    if (changeMenuColorOnOpen) colorTweenRef.current = gsap.to(btn, { color: opening ? openMenuButtonColor : menuButtonColor, delay: 0.18, duration: 0.3, ease: 'power2.out' });
  }, [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current; if (!inner) return;
    textCycleAnimRef.current?.kill();
    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const seq: string[] = [currentLabel, targetLabel, targetLabel];
    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });
    textCycleAnimRef.current = gsap.to(inner, { yPercent: -((seq.length - 1) / seq.length) * 100, duration: 0.5, ease: 'power4.out' });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) { onMenuOpen?.(); playOpen(); } else { onMenuClose?.(); playClose(); }
    animateIcon(target); animateColor(target); animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) { openRef.current = false; setOpen(false); onMenuClose?.(); playClose(); animateIcon(false); animateColor(false); animateText(false); }
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node) && toggleBtnRef.current && !toggleBtnRef.current.contains(e.target as Node)) closeMenu();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [closeOnClickAway, open, closeMenu]);

  return (
    <div
      className={(className ? className + ' ' : '') + 'staggered-menu-wrapper' + (isFixed ? ' fixed-wrapper' : '')}
      style={accentColor ? { ['--sm-accent' as any]: accentColor } : undefined}
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {(() => {
          const raw = colors?.slice(0, 4) || ['#1a1410', '#C9A96E'];
          const arr = raw.length >= 3 ? [...raw.slice(0, Math.floor(raw.length / 2)), ...raw.slice(Math.floor(raw.length / 2) + 1)] : [...raw];
          return arr.map((c, i) => <div key={i} className="sm-prelayer" style={{ background: c }} />);
        })()}
      </div>
      <header className="staggered-menu-header" aria-label="Main navigation header">
        <div className="sm-logo" aria-label="Logo">
          {logoUrl ? <img src={logoUrl} alt="Logo" className="sm-logo-img" draggable={false} /> : <span className="sm-logo-text">Maison Noir</span>}
        </div>
        <button ref={toggleBtnRef} className="sm-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={toggleMenu} type="button">
          <span className="sm-toggle-textWrap" aria-hidden="true">
            <span ref={textInnerRef} className="sm-toggle-textInner">
              {textLines.map((l, i) => <span className="sm-toggle-line" key={i}>{l}</span>)}
            </span>
          </span>
          <span ref={iconRef} className="sm-icon" aria-hidden="true">
            <span ref={plusHRef} className="sm-icon-line" />
            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </header>
      <aside id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel" aria-hidden={!open}>
        <div className="sm-panel-inner">
          <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
            {items.length ? items.map((it, idx) => (
              <li className="sm-panel-itemWrap" key={it.label + idx}>
                <a className="sm-panel-item" href={it.link} aria-label={it.ariaLabel} data-index={idx + 1} onClick={closeMenu}>
                  <span className="sm-panel-itemLabel">{it.label}</span>
                </a>
              </li>
            )) : null}
          </ul>
          {displaySocials && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title">Socials</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i} className="sm-socials-item">
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">{s.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;
