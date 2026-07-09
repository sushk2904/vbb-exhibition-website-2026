'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import ProductCard from '@/components/ui/ProductCard';
import { uniforms } from '@/data/products';

export default function CollectionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current!,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: titleRef.current!,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="w-full bg-[#0A122C]"
    >
      <div className="py-24 md:py-40 px-6 md:px-10 max-w-[1400px] mx-auto">
        {/* Section Title */}
        <div className="mb-16 md:mb-24">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none opacity-0"
          >
            School
            <br />
            Uniform
          </h2>
        </div>

        {/* Editorial Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
          {/* Featured Product (Spans 8 columns) */}
          <div className="md:col-span-8 md:row-span-2">
            <ProductCard
              {...uniforms[0]}
              index={0}
              theme="dark"
              featured={true}
            />
          </div>
          
          {/* Secondary Products (Staggered) */}
          <div className="md:col-span-4 md:mt-24">
            <ProductCard
              {...uniforms[1]}
              index={1}
              theme="dark"
            />
          </div>
          
          <div className="md:col-span-6 md:col-start-2">
            <ProductCard
              {...uniforms[2]}
              index={2}
              theme="dark"
            />
          </div>
          
          <div className="md:col-span-5 md:col-start-8 md:-mt-32">
            <ProductCard
              {...uniforms[3]}
              index={3}
              theme="dark"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
