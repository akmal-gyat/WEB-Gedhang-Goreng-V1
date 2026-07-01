import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Check, Star, Sparkles, Box, Users, Flame } from 'lucide-react';
import OrderButton from './OrderButton';

interface CardProps {
  key?: number;
  index: number;
  totalCards: number;
  title: string;
  subtitle: string;
  price: string;
  description: string;
  features: string[];
  icon: ReactNode;
  badge: string;
  popular?: boolean;
}

function StickyCard({ index, totalCards, title, subtitle, price, description, features, icon, badge, popular = false }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this card's container to trigger stacking downscale
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  // Calculate targetScale according to specification:
  // targetScale = 1 - (totalCards - 1 - index) * 0.03
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  
  // Map scroll progress to scale down as user scrolls further past this card
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  
  // Add a slight opacity dim on card scroll-past for maximum luxury contrast
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  // Position cards offset by index * 28px as per specification
  const topOffset = 96 + index * 28; // 96px = top-24, matching header thresholds

  return (
    <div 
      ref={cardRef}
      className="sticky w-full flex items-center justify-center py-6 sm:py-8"
      style={{ 
        top: `${topOffset}px`,
        height: '75vh',
        zIndex: index + 1
      }}
    >
      <motion.div
        style={{ scale, opacity }}
        className="relative w-full max-w-5xl mx-auto rounded-[40px] border-2 border-[#FFC107] bg-[#16120A] shadow-[0_20px_50px_rgba(15,12,7,0.8)] overflow-hidden h-full flex flex-col justify-between p-6 sm:p-10 md:p-12 transition-all duration-300"
      >
        {/* Dynamic decorative backdrop subtle glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC107]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4A2E1B]/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Header Row */}
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="bg-[#FFC107]/10 text-[#FFC107] border border-[#FFC107]/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
                {icon}
                {badge}
              </span>
              {popular && (
                <span className="bg-gradient-to-r from-amber-500 to-amber-700 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-current" />
                  YOGYA FAVORITE
                </span>
              )}
            </div>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
              {title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-[#E6D5B8] mt-2 font-light">
              {subtitle}
            </p>
          </div>
          
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-widest text-[#E6D5B8]/60 font-black">Investment</span>
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#FFC107] tracking-tight">
              {price}
            </div>
            <span className="text-[10px] text-[#E6D5B8]/40 block font-light">inc. luxury pack</span>
          </div>
        </div>

        {/* Middle Content Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8 my-auto pt-4 sm:pt-6">
          <div className="md:col-span-3">
            <p className="text-sm sm:text-base md:text-lg text-[#F7EFE5]/90 leading-relaxed font-light">
              {description}
            </p>
          </div>
          
          <div className="md:col-span-2 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
            <h4 className="text-xs uppercase font-black tracking-widest text-[#FFC107] mb-3">
              Included Privileges
            </h4>
            <ul className="space-y-2">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#E6D5B8]">
                  <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#FFC107]/10 flex items-center justify-center text-[#FFC107]">
                    <Check className="w-3 h-3" />
                  </span>
                  <span className="font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Interactive Row */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full border border-[#16120A] bg-gradient-to-br from-[#4A2E1B] to-[#FFC107] flex items-center justify-center text-[10px] text-white font-black">
                  {i === 0 ? '🍫' : i === 1 ? '🍵' : '🍓'}
                </div>
              ))}
            </div>
            <span className="text-xs text-[#E6D5B8]/80 font-light">
              Selectable culinary toppings
            </span>
          </div>

          <OrderButton className="w-full sm:w-auto" />
        </div>
      </motion.div>
    </div>
  );
}

export default function PackagesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const cardsData = [
    {
      title: "The Solo Box",
      subtitle: "Single Flavor Heavy-Load",
      price: "Rp 35.000",
      badge: "SOLO INDULGENCE",
      description: "Our signature crispy fried banana chips loaded to the brim with one thick, slow-melted premium glaze of your choice. A personal, decadent snack session packed with maximum crunch.",
      features: [
        "1 Selectable Premium Glaze",
        "Classic Golden Kraft Box",
        "Crispy banana leaf lining",
        "100% Organic Local Bananas"
      ],
      icon: <Box className="w-3.5 h-3.5" />,
      popular: false
    },
    {
      title: "The Share Platter",
      subtitle: "Split Box Double Pleasure",
      price: "Rp 65.000",
      badge: "COUPLES & FRIENDS",
      description: "Designed for dual desires. Split-compartment design loaded with two legendary slow-melted glazes side-by-side. Complemented with roasted almond slices or crushed roasted nuts.",
      features: [
        "2 Selectable Premium Glazes",
        "Split Compartment Gift Box",
        "Double Portion Banana Chips",
        "Roasted Almond Slices topping",
        "Great for 2-3 Persons"
      ],
      icon: <Users className="w-3.5 h-3.5" />,
      popular: true
    },
    {
      title: "The Party Ultimate",
      subtitle: "Triple Topping Catering Pack",
      price: "Rp 95.000",
      badge: "LAVISH CELEBRATION",
      description: "A breathtaking banquet box of crunch. Features a massive mound of our supreme crispy banana chips layered under a glorious collision of Chocolate, Matcha, and Strawberry glazes, topped with crunchy cookie crumbles.",
      features: [
        "All 3 Premium Glazes (Triple Split)",
        "Signature Black-Gold Luxury Case",
        "Ultra-dense topping layer",
        "Choco cookies & rainbow crumbles",
        "Perfect for 4-5 Persons"
      ],
      icon: <Sparkles className="w-3.5 h-3.5" />,
      popular: false
    }
  ];

  return (
    <section 
      id="packages" 
      ref={containerRef}
      className="relative bg-[#0F0C07] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 z-10 pt-24 pb-32 overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-20">
          <span className="text-[#FFC107] text-sm uppercase font-black tracking-widest block mb-3">
            Elite Collections
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase hero-heading tracking-tighter leading-none">
            THE BOXES
          </h2>
          <p className="text-[#E6D5B8] max-w-xl mx-auto text-xs sm:text-sm mt-4 font-light uppercase tracking-wider">
            Select your box size. Customize your glaze profiles. Embark on a crisp culinary journey.
          </p>
        </div>

        {/* Stacking Sticky Cards */}
        <div className="relative flex flex-col gap-10">
          {cardsData.map((card, idx) => (
            <StickyCard
              key={idx}
              index={idx}
              totalCards={cardsData.length}
              title={card.title}
              subtitle={card.subtitle}
              price={card.price}
              badge={card.badge}
              description={card.description}
              features={card.features}
              icon={card.icon}
              popular={card.popular}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
