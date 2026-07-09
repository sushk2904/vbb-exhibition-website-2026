'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from '@/lib/gsap';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { label: 'Uniform', href: '#collection' },
  { label: 'Accessories', href: '#accessories' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#cta' },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { totalItems, setIsCartOpen } = useCart();

  const pathname = usePathname();

  // Listen for custom events dispatched by HeroSection
  useEffect(() => {
    if (pathname !== '/') {
      setVisible(true);
      return;
    }

    // Initial check on load (e.g. if returning via back button and already scrolled down)
    if (window.scrollY > window.innerHeight) {
      setVisible(true);
    } else {
      setVisible(false);
    }

    const showNav = () => setVisible(true);
    const hideNav = () => setVisible(false);

    window.addEventListener('heroScrollDone', showNav);
    window.addEventListener('heroScrollActive', hideNav);

    return () => {
      window.removeEventListener('heroScrollDone', showNav);
      window.removeEventListener('heroScrollActive', hideNav);
    };
  }, [pathname]);

  // Track scroll position for background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate in when visible changes to true
  useEffect(() => {
    if (!navRef.current) return;
    if (visible) {
      gsap.fromTo(
        navRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );
    } else {
      gsap.to(navRef.current, {
        y: -30, opacity: 0, duration: 0.3, ease: 'power2.in',
      });
    }
  }, [visible]);

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 opacity-0 ${
        scrolled
          ? 'bg-[#2C5F8A]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-white/5'
          : 'bg-[#2C5F8A] border-b border-white/5'
      }`}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-lg md:text-xl font-bold tracking-tight text-white cursor-pointer hover:opacity-80 transition-opacity duration-300"
          >
            VBB
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-[13px] font-semibold text-white/70 hover:text-white transition-colors duration-300 tracking-wide uppercase cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-white/70 hover:text-white transition-colors duration-300 p-2"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-white text-[#0A122C] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button & Cart */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-white/70 hover:text-white transition-colors p-2"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-white text-[#0A122C] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-[5px] cursor-pointer p-2"
              aria-label="Toggle menu"
            >
            <span
              className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
              }`}
            />
          </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } bg-[#2C5F8A]/95 backdrop-blur-xl border-t border-white/5`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-semibold text-white/70 hover:text-white transition-colors duration-300 tracking-wide uppercase text-left cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
