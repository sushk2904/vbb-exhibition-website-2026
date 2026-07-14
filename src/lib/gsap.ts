'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

// Shared easing curves — luxury feel
export const EASE = {
  smooth: 'power3.out',
  elegant: 'power4.out',
  entrance: 'power2.out',
  exit: 'power2.in',
  inOut: 'power3.inOut',
} as const;

// Shared animation defaults
export const DURATION = {
  fast: 0.4,
  normal: 0.8,
  slow: 1.2,
  hero: 1.6,
} as const;

/**
 * Create a fade-up reveal animation for an element
 */
export function createRevealAnimation(
  element: HTMLElement | null,
  options: {
    y?: number;
    duration?: number;
    delay?: number;
    ease?: string;
    start?: string;
  } = {}
) {
  if (!element) return;

  const {
    y = 60,
    duration = DURATION.normal,
    delay = 0,
    ease = EASE.elegant,
    start = 'top 85%',
  } = options;

  gsap.fromTo(
    element,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: 'play none none none',
      },
    }
  );
}

/**
 * Stagger children elements with fade-up
 */
export function createStaggerAnimation(
  parent: HTMLElement | null,
  childSelector: string,
  options: {
    y?: number;
    stagger?: number;
    duration?: number;
    ease?: string;
    start?: string;
  } = {}
) {
  if (!parent) return;

  const {
    y = 60,
    stagger = 0.15,
    duration = DURATION.normal,
    ease = EASE.elegant,
    start = 'top 85%',
  } = options;

  const children = parent.querySelectorAll(childSelector);

  gsap.fromTo(
    children,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: parent,
        start,
        toggleActions: 'play none none none',
      },
    }
  );
}
