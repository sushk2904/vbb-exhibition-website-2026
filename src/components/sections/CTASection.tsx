'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import MagneticButton from '@/components/ui/MagneticButton';

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (btnRef.current) {
        gsap.fromTo(
          btnRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: btnRef.current,
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
      id="cta"
      ref={sectionRef}
      className="py-32 md:py-48 px-6 md:px-10 text-center"
    >
      <h2
        ref={headingRef}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary tracking-tighter leading-none opacity-0"
      >
        Ready for School?
      </h2>

      <div ref={btnRef} className="mt-10 md:mt-14 opacity-0">
        <MagneticButton
          className="inline-flex items-center gap-3 bg-white text-[#0A122C] px-8 py-4 md:px-12 md:py-5 rounded-full text-sm md:text-base font-bold tracking-wide
            hover:scale-[1.03] hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.15)] transition-all duration-500"
        >
          View Complete Collection
          <span className="text-lg">→</span>
        </MagneticButton>
      </div>
    </section>
  );
}
