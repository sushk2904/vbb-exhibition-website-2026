'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import ProductCard from '@/components/ui/ProductCard';
import { accessories } from '@/data/products';

export default function AccessoriesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
      id="accessories"
      ref={sectionRef}
      className="py-24 md:py-40 bg-[#0A122C]"
    >
      {/* Section Title */}
      <div className="mb-16 md:mb-24 px-6 md:px-10 max-w-[1400px] mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none opacity-0"
        >
          Accessories
        </h2>
      </div>

      {/* Product Grid */}
      <div className="px-6 md:px-10 max-w-[1400px] mx-auto pb-8">
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
        >
          {accessories.map((product, i) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              subtitle={product.subtitle}
              image={product.image}
              price={product.price}
              index={i}
              variant="grid"
              theme="dark"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
