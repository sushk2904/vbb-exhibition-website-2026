'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Hook that provides a GSAP context scoped to a ref element.
 * Automatically cleans up on unmount.
 */
export function useGsapContext<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {}, ref.current!);
    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Hook that runs a GSAP animation callback scoped to a container ref.
 * Provides automatic cleanup.
 */
export function useGsapAnimation<T extends HTMLElement = HTMLDivElement>(
  animation: (element: T, gsapInstance: typeof gsap) => void,
  deps: React.DependencyList = []
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      animation(ref.current!, gsap);
    }, ref.current);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/**
 * Hook for scroll-triggered animations
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: {
    y?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    ease?: string;
    start?: string;
  } = {}
) {
  const {
    y = 60,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    ease = 'power4.out',
    start = 'top 85%',
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!,
        { y, opacity },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: ref.current!,
            start,
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/**
 * Hook for refreshing ScrollTrigger after layout changes
 */
export function useScrollTriggerRefresh(deps: React.DependencyList = []) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
