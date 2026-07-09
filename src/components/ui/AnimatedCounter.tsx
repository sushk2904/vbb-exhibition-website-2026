'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
  index?: number;
}

export default function AnimatedCounter({
  value,
  suffix = '',
  label,
  index = 0,
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!counterRef.current || !numberRef.current) return;

    const ctx = gsap.context(() => {
      // Fade in the card
      gsap.fromTo(
        counterRef.current!,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: counterRef.current!,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animate the counter
      const counter = { val: 0 };
      gsap.to(counter, {
        val: value,
        duration: 2,
        delay: index * 0.15 + 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: counterRef.current!,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          setDisplayValue(Math.round(counter.val));
        },
      });
    });

    return () => ctx.revert();
  }, [value, index]);

  return (
    <div ref={counterRef} className="text-center opacity-0">
      <div className="flex items-baseline justify-center gap-1">
        <span
          ref={numberRef}
          className="text-5xl md:text-7xl font-black text-primary tracking-tighter"
        >
          {displayValue}
        </span>
        <span className="text-2xl md:text-3xl font-bold text-secondary">
          {suffix}
        </span>
      </div>
      <p className="mt-3 text-sm md:text-base text-secondary uppercase tracking-[0.2em] font-medium">
        {label}
      </p>
    </div>
  );
}
