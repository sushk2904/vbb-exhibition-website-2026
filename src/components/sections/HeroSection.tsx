'use client';

import { useRef, useEffect, useCallback } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import MagneticButton from '@/components/ui/MagneticButton';

const FRAME_COUNT = 178;
const FRAME_PATH = '/hero-frames/frame_';

function getFrameSrc(index: number): string {
  const num = String(Math.min(Math.max(index, 1), FRAME_COUNT)).padStart(4, '0');
  return `${FRAME_PATH}${num}.jpg`;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const line1EntranceRef = useRef<HTMLSpanElement>(null);
  const line2EntranceRef = useRef<HTMLSpanElement>(null);
  const line3EntranceRef = useRef<HTMLSpanElement>(null);
  const descEntranceRef = useRef<HTMLParagraphElement>(null);
  const ctaEntranceRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);

  const line1ScrollRef = useRef<HTMLSpanElement>(null);
  const line2ScrollRef = useRef<HTMLSpanElement>(null);
  const line3ScrollRef = useRef<HTMLSpanElement>(null);
  const descScrollRef = useRef<HTMLDivElement>(null);
  const ctaScrollRef = useRef<HTMLDivElement>(null);

  const vbb1EntranceRef = useRef<HTMLSpanElement>(null);
  const vbb2EntranceRef = useRef<HTMLSpanElement>(null);
  const vbb3EntranceRef = useRef<HTMLSpanElement>(null);
  const vbb1ScrollRef = useRef<HTMLSpanElement>(null);
  const vbb2ScrollRef = useRef<HTMLSpanElement>(null);
  const vbb3ScrollRef = useRef<HTMLSpanElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef({ value: 0 });
  const dprRef = useRef(1);

  // Draw frame using object-cover logic so it fills the entire viewport
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;

    // High-quality upscaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.clearRect(0, 0, cw, ch);

    // ── Object-cover logic ──
    const imgRatio = img.width / img.height;
    const canvasRatio = cw / ch;

    let dw: number, dh: number, ox: number, oy: number;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image aspect ratio -> crop top/bottom
      dw = cw;
      dh = cw / imgRatio;
      ox = 0;
      oy = (ch - dh) / 2;
    } else {
      // Canvas is taller than image aspect ratio -> crop sides
      dh = ch;
      dw = ch * imgRatio;
      ox = (cw - dw) / 2;
      oy = 0;
    }

    ctx.drawImage(img, ox, oy, dw, dh);
  }, []);

  // Set canvas backing store to viewport × devicePixelRatio for crisp rendering
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use window dimensions since canvas is styled as w-screen h-screen
    const width = window.innerWidth;
    const height = window.innerHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2× for performance
    dprRef.current = dpr;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    renderFrame(Math.round(frameIndexRef.current.value));
  }, [renderFrame]);

  useEffect(() => {
    // ── Preload frames ──
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameSrc(i + 1);
      img.onload = () => {
        loaded++;
        if (loaded === 1) handleResize();
      };
      images.push(img);
    }
    imagesRef.current = images;

    window.addEventListener('resize', handleResize);

    // ── GSAP Animations ──
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !canvasRef.current) return;

      // ── 1. Page Load Entrance (Animates the inner entrance-refs) ──
      const tlEntrance = gsap.timeline();
      
      tlEntrance.fromTo(
        line1EntranceRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power4.out' }
      );
      tlEntrance.fromTo(
        line2EntranceRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power4.out' },
        '-=0.85'
      );
      tlEntrance.fromTo(
        line3EntranceRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power4.out' },
        '-=0.85'
      );
      tlEntrance.fromTo(
        descEntranceRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.7'
      );
      
      tlEntrance.fromTo(
        vbb1EntranceRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power4.out' },
        '-=0.85'
      );
      tlEntrance.fromTo(
        vbb2EntranceRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power4.out' },
        '-=0.85'
      );
      tlEntrance.fromTo(
        vbb3EntranceRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power4.out' },
        '-=0.85'
      );
      tlEntrance.fromTo(
        ctaEntranceRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );

      // ── 2. Scroll Scrub Timeline (Animates the outer scroll-refs) ──
      const tlScroll = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=450%',
          pin: true,
          scrub: 1.2, // extra smooth scroll lag
          onUpdate: (self) => {
            const frame = Math.round(self.progress * (FRAME_COUNT - 1));
            frameIndexRef.current.value = frame;
            renderFrame(frame);
          },
          onLeave: () => {
            window.dispatchEvent(new CustomEvent('heroScrollDone'));
          },
          onEnterBack: () => {
            window.dispatchEvent(new CustomEvent('heroScrollActive'));
          },
        },
      });

      // Canvas Zoom & Smooth Scaling during scroll
      tlScroll.fromTo(
        canvasRef.current,
        { scale: 1 },
        { scale: 1.05, duration: 1, ease: 'none' },
        0
      );

      // ── Swipe out heading lines sequentially to the left ──
      tlScroll.to(line1ScrollRef.current, {
        x: -250, opacity: 0, ease: 'power3.inOut'
      }, 0.20);
      tlScroll.to(line2ScrollRef.current, {
        x: -250, opacity: 0, ease: 'power3.inOut'
      }, 0.25);
      tlScroll.to(line3ScrollRef.current, {
        x: -250, opacity: 0, ease: 'power3.inOut'
      }, 0.30);
      
      tlScroll.to(vbb1ScrollRef.current, {
        x: 250, opacity: 0, ease: 'power3.inOut'
      }, 0.20);
      tlScroll.to(vbb2ScrollRef.current, {
        x: 250, opacity: 0, ease: 'power3.inOut'
      }, 0.25);
      tlScroll.to(vbb3ScrollRef.current, {
        x: 250, opacity: 0, ease: 'power3.inOut'
      }, 0.30);

      // Slide out description to the left
      tlScroll.to(descScrollRef.current, {
        x: -150, opacity: 0, ease: 'power3.inOut'
      }, 0.33);

      // Fade out CTA early
      tlScroll.to(ctaScrollRef.current, {
        y: 40, opacity: 0, ease: 'power2.in'
      }, 0.15);

      // Transition the background color to deep navy matching the next section
      tlScroll.to(sectionRef.current, {
        backgroundColor: '#0A122C', duration: 0.15, ease: 'power2.inOut'
      }, 0.75);

      // Fade out canvas and vignette at the end of the scroll to reveal the deep navy background
      tlScroll.to(canvasRef.current, {
        opacity: 0, duration: 0.1, ease: 'power2.out'
      }, 0.9);
      tlScroll.to(vignetteRef.current, {
        opacity: 0, duration: 0.1, ease: 'power2.out'
      }, 0.9);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [handleResize, renderFrame]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Full-screen canvas background — w-screen h-screen to avoid gaps */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-screen h-screen block z-0"
      />

      {/* Subtle left-side vignette for text legibility */}
      <div 
        ref={vignetteRef}
        className="absolute inset-0 bg-gradient-to-r from-black/15 via-black/5 to-transparent pointer-events-none z-[1]" 
      />

      {/* Interactive Text Overlay */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20 flex justify-between items-start">
          {/* Left Side: Crafted for Excellence */}
          <div className="max-w-4xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] font-black leading-[0.9] tracking-tighter flex flex-col gap-1">
              <span ref={line1ScrollRef} className="inline-block">
                <span ref={line1EntranceRef} className="inline-block text-black opacity-0">
                  CRAFTED
                </span>
              </span>
              <span ref={line2ScrollRef} className="inline-block">
                <span ref={line2EntranceRef} className="inline-block text-black opacity-0">
                  FOR
                </span>
              </span>
              <span ref={line3ScrollRef} className="inline-block">
                <span ref={line3EntranceRef} className="inline-block text-accent opacity-0">
                  EXCELLENCE
                </span>
              </span>
            </h1>
            <div ref={descScrollRef} className="inline-block">
              <p
                ref={descEntranceRef}
                className="mt-6 md:mt-8 text-base md:text-lg text-black font-semibold leading-relaxed max-w-sm opacity-0"
              >
                Every stitch reflects quality,
                <br />
                discipline, and identity.
              </p>
            </div>
          </div>
          
          {/* Right Side: VBB Typography */}
          <div className="hidden md:flex flex-col items-end text-right">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] font-black leading-[0.9] tracking-tighter text-[#0A122C] flex flex-col gap-1">
              <span ref={vbb1ScrollRef} className="inline-block">
                <span ref={vbb1EntranceRef} className="inline-block opacity-0">V</span>
              </span>
              <span ref={vbb2ScrollRef} className="inline-block">
                <span ref={vbb2EntranceRef} className="inline-block opacity-0">B</span>
              </span>
              <span ref={vbb3ScrollRef} className="inline-block">
                <span ref={vbb3EntranceRef} className="inline-block opacity-0">B</span>
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator CTA */}
      <div
        ref={ctaScrollRef}
        className="absolute bottom-10 md:bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <div ref={ctaEntranceRef} className="opacity-0">
          <MagneticButton className="flex flex-col items-center gap-2 group">
            <span className="text-xs uppercase tracking-[0.25em] text-black group-hover:text-accent transition-colors duration-300">
              Explore Collection
            </span>
            <span className="text-2xl text-black animate-bounce-slow">↓</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
