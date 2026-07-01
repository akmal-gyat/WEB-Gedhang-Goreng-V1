/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import MenuSection from './components/MenuSection';
import PackagesSection from './components/PackagesSection';
import { ChefHat, Flame, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  return (
    <div 
      className="min-h-screen bg-[#0F0C07] text-[#F7EFE5] select-none font-sans flex flex-col"
      style={{ overflowX: 'clip' }}
    >
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. MARQUEE SECTION */}
      <MarqueeSection />

      {/* 3. ABOUT SECTION */}
      <AboutSection />

      {/* 4. MENU SECTION (THE FLAVORS) */}
      <MenuSection />

      {/* 5. PACKAGES SECTION (THE BOXES) */}
      <PackagesSection />

      {/* 6. LUXURY BRAND FOOTER */}
      <footer className="bg-[#0A0805] text-[#E6D5B8]/80 py-16 px-6 sm:px-10 border-t border-[#FFC107]/10 relative z-20">
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Brand Signature */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFC107] to-[#4A2E1B] flex items-center justify-center shadow-lg shadow-black/40">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-black text-base text-white tracking-widest block leading-none">GEDHANG GOERENG YK</span>
              <span className="font-light text-xs text-[#FFC107] tracking-wider mt-1 block">Artisanal Banana Chips & Premium Glazes</span>
            </div>
          </div>

          {/* Core Values */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-black uppercase tracking-widest text-[#FFC107]/80">
            <div className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" />
              <span>Crispy Fresh Daily</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Premium Ingredients Only</span>
            </div>
          </div>

          {/* Copyright & Location */}
          <div className="text-center md:text-right font-light text-xs space-y-1">
            <p className="text-white/40">Handcrafted in Yogyakarta, Indonesia</p>
            <p className="flex items-center justify-center md:justify-end gap-1.5 text-[#E6D5B8]/60">
              Made with <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" /> © {new Date().getFullYear()} Gedhang Goereng YK.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}
