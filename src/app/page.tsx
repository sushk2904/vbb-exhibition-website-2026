'use client';

import { useLenis } from '@/hooks/useLenis';
import HeroSection from '@/components/sections/HeroSection';
import CollectionSection from '@/components/sections/CollectionSection';
import AccessoriesSection from '@/components/sections/AccessoriesSection';
import DetailSection from '@/components/sections/DetailSection';
import StatsSection from '@/components/sections/StatsSection';
import GallerySection from '@/components/sections/GallerySection';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  useLenis();

  return (
    <>
      <main>
        <HeroSection />
        <CollectionSection />
        <AccessoriesSection />
        <DetailSection />
        <StatsSection />
        <GallerySection />
        <CTASection />
      </main>
    </>
  );
}
