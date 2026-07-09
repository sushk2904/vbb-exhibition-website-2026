'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';

export default function DetailSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Image parallax + reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Subtle parallax on scroll
        gsap.to(imageRef.current.querySelector('img'), {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Text reveal
      if (textRef.current) {
        const elements = textRef.current.querySelectorAll('.reveal-text');
        gsap.fromTo(
          elements,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Image */}
        <div
          ref={imageRef}
          className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 opacity-0"
        >
          <Image
            src="/images/back-shirt.png"
            alt="Premium school uniform detail"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-8 md:p-16 scale-[1.3]"
            loading="lazy"
          />
        </div>

        {/* Text */}
        <div ref={textRef}>
          <h2 className="reveal-text text-4xl sm:text-5xl md:text-6xl font-black text-primary tracking-tighter leading-[0.95]">
            Designed for
            <br />
            Comfort.
          </h2>
          <h2 className="reveal-text text-4xl sm:text-5xl md:text-6xl font-black text-primary tracking-tighter leading-[0.95] mt-2">
            Built for
            <br />
            <span className="text-accent">Confidence.</span>
          </h2>
          <p className="reveal-text mt-8 md:mt-12 text-base md:text-lg text-secondary leading-relaxed max-w-md">
            Each uniform is crafted with precision tailoring, using fabrics
            that breathe with you through every class, every game, every moment
            that matters.
          </p>
          <p className="reveal-text mt-4 text-base md:text-lg text-secondary leading-relaxed max-w-md">
            We believe school wear should feel as good as it looks because
            confidence starts with comfort.
          </p>
        </div>
      </div>
    </section>
  );
}
