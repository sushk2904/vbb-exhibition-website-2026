'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';

const galleryImages = [
  { src: '/images/red-stripes.png', alt: 'Red House Shirt', span: 'row-span-2' },
  { src: '/images/orange-stripes.png', alt: 'Orange House Shirt', span: '' },
  { src: '/images/black-shoes.png', alt: 'Black Shoes', span: '' },
  { src: '/images/green-stripes.png', alt: 'Green House Shirt', span: 'row-span-2' },
  { src: '/images/white-shoes.png', alt: 'White Shoes', span: '' },
  { src: '/images/yellow-stripes.png', alt: 'Yellow House Shirt', span: '' },
  { src: '/images/backpack.png', alt: 'School Backpack', span: '' },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 80, opacity: 0 },
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

      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll('.gallery-item');
        gsap.fromTo(
          items,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
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
      id="gallery"
      ref={sectionRef}
      className="py-24 md:py-40 px-6 md:px-10 max-w-[1400px] mx-auto"
    >
      {/* Title */}
      <div className="mb-16 md:mb-24">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary tracking-tighter leading-none opacity-0"
        >
          Gallery
        </h2>
      </div>

      {/* Masonry Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[280px]"
      >
        {galleryImages.map((img, i) => (
          <div
            key={i}
            className={`gallery-item relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 group cursor-pointer opacity-0 ${img.span}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-contain p-6 md:p-10 transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-transparent group-hover:bg-white/10 transition-colors duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
}
