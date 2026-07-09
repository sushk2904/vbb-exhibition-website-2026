'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  price: number;
  index?: number;
  variant?: 'grid' | 'horizontal';
  theme?: 'light' | 'dark';
  featured?: boolean;
}

export default function ProductCard({
  id,
  name,
  subtitle,
  image,
  price,
  index = 0,
  variant = 'grid',
  theme = 'light',
  featured = false,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current!,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: cardRef.current!,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [index]);

  const isHorizontal = variant === 'horizontal';

  return (
    <div
      ref={cardRef}
      onClick={() => router.push(`/product/${id}`)}
      className={`group relative cursor-pointer opacity-0 ${
        isHorizontal ? 'min-w-[280px] md:min-w-[320px] flex-shrink-0' : ''
      }`}
    >
      {/* Image Container */}
      <div
        ref={imageRef}
        className={`relative overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/[0.03] transition-all duration-700 ease-out
          group-hover:bg-white/[0.04] group-hover:border-white/[0.08]
          group-hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)]
          ${featured ? 'aspect-[4/5] md:aspect-[3/4]' : isHorizontal ? 'aspect-[3/4]' : 'aspect-[4/5]'}
        `}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes={featured ? '(max-width: 768px) 100vw, 66vw' : isHorizontal ? '320px' : '(max-width: 768px) 50vw, 33vw'}
          className={`object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03] group-hover:-translate-y-2
            ${featured ? 'p-10 md:p-20' : 'p-8 md:p-12'}
          `}
          loading="lazy"
        />
      </div>

      {/* Text & CTA */}
      <div className="mt-6 md:mt-8 px-2 flex justify-between items-start transition-transform duration-700 ease-out group-hover:-translate-y-1">
        <div>
          <h3
            className={`${featured ? 'text-xl md:text-3xl' : 'text-base md:text-lg'} font-semibold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-primary'
            }`}
          >
            {name}
          </h3>
          <p
            className={`${featured ? 'text-base md:text-lg mt-2' : 'text-sm mt-1'} ${
              theme === 'dark' ? 'text-white/60' : 'text-secondary'
            }`}
          >
            {subtitle}
          </p>
        </div>
        
        {/* Subtle CTA */}
        <div className="opacity-0 -translate-x-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0 pt-1 flex items-center gap-2">
          <span className={`text-xs uppercase tracking-widest font-bold ${theme === 'dark' ? 'text-white' : 'text-primary'}`}>
            Select Options
          </span>
          <ShoppingBag className={`w-4 h-4 ${theme === 'dark' ? 'text-white' : 'text-primary'}`} />
        </div>
      </div>
    </div>
  );
}
