'use client';

import {useEffect, useRef, useSyncExternalStore, type ReactNode} from 'react';
import {animate as animateValue, inView, stagger, type AnimationPlaybackControls} from 'motion';
import {animate} from 'motion/mini';

const motionPreference = '(prefers-reduced-motion: reduce)';
function subscribeToMotionPreference(onChange: () => void) {
  const preference = window.matchMedia(motionPreference);
  preference.addEventListener('change', onChange);
  return () => preference.removeEventListener('change', onChange);
}
function getMotionPreference() { return window.matchMedia(motionPreference).matches; }
function getServerMotionPreference() { return true; }
function useReducedMotion() {
  // Subscribe explicitly so changing the OS preference also cancels active effects.
  return useSyncExternalStore(subscribeToMotionPreference, getMotionPreference, getServerMotionPreference);
}

const ease = [0.25, 0.1, 0.25, 1] as const;
function preserveStyles(elements: Element[]) {
  const styles = elements.map(element => {
    const style = (element as HTMLElement).style;
    return {style, opacity: style.opacity, transform: style.transform};
  });
  return () => styles.forEach(({style, opacity, transform}) => {
    if (opacity) style.opacity = opacity; else style.removeProperty('opacity');
    if (transform) style.transform = transform; else style.removeProperty('transform');
  });
}
const revealTargets = [
  '.section-heading', '.about-split > div', '.schools-feature-copy > *',
  '.model-grid > *', '.programme-grid > *', '.article-grid > *',
  '.involved-grid > *', '.people-grid > *', '.values-grid > *',
  '.about-purpose-grid > *', '.about-values-grid > *', '.about-people-grid > *', '.about-accountability-grid > *',
  '.resource-grid > *', '.gallery-grid > *', '.school-grid > *',
  '.timeline > *', '.work-row', '.programme-detail > *', '.join-layout > *',
  '.contact-grid > *', '.office-grid > *', '.donation-layout > *',
  '.bank-grid > *', '.give-inner > div:not(.band-sun)', '.article-header > *',
  '.article-feature', '.tender-notice-grid > *', '.thematic-grid > *', '.focus-grid > *', '.project-grid > *', '.giving-shop-grid > *', '.giving-enquiry-grid > *',
].join(',');

/** Enhance existing elements, preserving grid structure and server-rendered content. */
export function AnimatedMain({children, page}: {children: ReactNode; page: string}) {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const main = root.current;
    if (!main || reducedMotion !== false) return;

    const seen = new WeakSet<Element>();
    const observers: (() => void)[] = [];
    const animations = new Map<AnimationPlaybackControls, () => void>();
    const reveal = (element: Element) => {
      const index = Array.from(element.parentElement?.children ?? []).indexOf(element);
      const isGrid = element.parentElement?.className.includes('grid');
      const restore = preserveStyles([element]);
      const animation = animate(element, {
        opacity: [0, 1], transform: ['translateY(22px)', 'translateY(0px)'],
      }, {duration: 1.2, delay: isGrid ? (index % 3) * 0.16 : 0, ease});
      animations.set(animation, restore);
      // Release inline transforms so CSS hover effects can take over.
      void animation.then(() => {
        if (!animations.has(animation)) return;
        animation.cancel();
        restore();
        animations.delete(animation);
      });
    };
    const observe = () => {
      main.querySelectorAll(revealTargets).forEach(element => {
        if (seen.has(element)) return;
        seen.add(element);
        observers.push(inView(element, reveal, {amount: 0.12}));
      });
    };
    observe();
    // Tabs, pagination and search can mount new cards after the initial render.
    const mutations = new MutationObserver(records => {
      if (records.some(record => Array.from(record.addedNodes).some(node => node.nodeType === 1))) observe();
    });
    mutations.observe(main, {childList: true, subtree: true});
    return () => {
      mutations.disconnect();
      observers.forEach(stop => stop());
      animations.forEach((restore, animation) => { animation.cancel(); restore(); });
      animations.clear();
    };
  }, [page, reducedMotion]);

  return <main ref={root} id="main-content">{children}</main>;
}

export function HeroCopy({children}: {children: ReactNode}) {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (!root.current || reducedMotion !== false) return;
    const elements = Array.from(root.current.children);
    const restore = preserveStyles(elements);
    const animation = animate(elements, {
      opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0px)'],
    }, {duration: 1.4, delay: stagger(0.18), ease});
    return () => { animation.cancel(); restore(); };
  }, [reducedMotion]);
  return <div ref={root} className="hero-copy">{children}</div>;
}

export function HeroPhoto({children}: {children: ReactNode}) {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (!root.current || reducedMotion !== false) return;
    const restore = preserveStyles([root.current]);
    const animation = animate(root.current, {
      opacity: [0.4, 1], transform: ['scale(1.06)', 'scale(1)'],
    }, {duration: 2.4, ease});
    return () => { animation.cancel(); restore(); };
  }, [reducedMotion]);
  return <div ref={root} className="hero-photo">{children}</div>;
}

export function PageIntro({children}: {children: ReactNode}) {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (!root.current || reducedMotion !== false) return;
    const elements = Array.from(root.current.querySelectorAll('.breadcrumbs, .eyebrow, h1, p:not(.eyebrow), .page-hero-icon'));
    const restore = preserveStyles(elements);
    const animation = animate(elements, {
      opacity: [0, 1], transform: ['translateY(16px)', 'translateY(0px)'],
    }, {duration: 1.15, delay: stagger(0.14), ease});
    return () => { animation.cancel(); restore(); };
  }, [reducedMotion]);
  return <div ref={root} className="container">{children}</div>;
}

export function CountUp({value}: {value: number}) {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const formatted = value.toLocaleString('en-US');
  useEffect(() => {
    const element = root.current;
    if (!element || reducedMotion !== false) return;
    let animation: AnimationPlaybackControls | undefined;
    const stop = inView(element, () => {
      animation = animateValue(0, value, {
        duration: 2.8, ease,
        onUpdate: latest => { element.textContent = Math.round(latest).toLocaleString('en-US'); },
      });
    }, {amount: 0.6});
    return () => {
      stop();
      animation?.stop();
      element.textContent = formatted;
    };
  }, [value, formatted, reducedMotion]);
  return <strong><span className="sr-only">{formatted}</span><b ref={root} className="counter-value" aria-hidden="true">{formatted}</b></strong>;
}
