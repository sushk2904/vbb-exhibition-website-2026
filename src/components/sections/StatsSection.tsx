'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { stats } from '@/data/products';

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-40 px-6 md:px-10 max-w-[1400px] mx-auto"
    >
      {/* Title */}
      <div className="text-center mb-16 md:mb-24">
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-primary tracking-tighter opacity-0"
        >
          Fabric Quality
        </h2>
        <div
          ref={lineRef}
          className="mt-6 h-[1px] w-16 bg-accent mx-auto origin-center"
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
        {stats.map((stat, i) => (
          <AnimatedCounter
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
