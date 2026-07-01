import { useRef, useEffect, useState } from 'react';

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const sectionTop = sectionRef.current.offsetTop;
      // Scroll offset calculated as: (window.scrollY - sectionTop + window.innerHeight) * 0.3
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      
      setScrollOffset(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial measurement

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const row1Text = "MAXIMUM CRUNCH • CRISPY EVERY BITE • ";
  const row2Text = "MELTED TO PERFECTION • YOGYAKARTA ORIGINAL • ";

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#0C0C0C] pt-24 pb-10 overflow-hidden w-full select-none"
      style={{ overflowX: 'clip' }}
    >
      <div className="absolute inset-0 bg-[#FFC107]/2 opacity-[0.02] pointer-events-none" />
      
      <div className="flex flex-col gap-6 md:gap-8 w-full">
        {/* Row 1: Moving Right */}
        <div className="relative flex whitespace-nowrap overflow-hidden border-y border-white/5 py-4 bg-gradient-to-r from-transparent via-[#16120A] to-transparent">
          <div 
            className="flex gap-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-[#FFC107] tracking-tighter"
            style={{ 
              transform: `translateX(${scrollOffset}px)`,
              willChange: 'transform',
              transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            {/* Triple repeated content for seamless overlay */}
            <span>{row1Text}</span>
            <span>{row1Text}</span>
            <span>{row1Text}</span>
            <span>{row1Text}</span>
            <span>{row1Text}</span>
          </div>
        </div>

        {/* Row 2: Moving Left */}
        <div className="relative flex whitespace-nowrap overflow-hidden border-y border-white/5 py-4 bg-gradient-to-r from-transparent via-[#16120A] to-transparent">
          <div 
            className="flex gap-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-[#F7EFE5] tracking-tighter"
            style={{ 
              transform: `translateX(${-scrollOffset - 300}px)`, // offset to start balanced
              willChange: 'transform',
              transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            {/* Triple repeated content for seamless overlay */}
            <span>{row2Text}</span>
            <span>{row2Text}</span>
            <span>{row2Text}</span>
            <span>{row2Text}</span>
            <span>{row2Text}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
