'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from '@/lib/gsap';

/**
 * Initialize Lenis smooth scrolling and sync with GSAP ScrollTrigger
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP ticker for Lenis raf
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    // Import gsap for ticker
    import('@/lib/gsap').then(({ gsap }) => {
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      lenis.destroy();
      import('@/lib/gsap').then(({ gsap }) => {
        gsap.ticker.remove(tickerCallback);
      });
    };
  }, []);
}
