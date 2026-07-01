import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Leaf, Heart, Layers } from 'lucide-react';

interface MenuItem {
  num: string;
  title: string;
  description: string;
  colorClass: string;
  icon: ReactNode;
  bgGlow: string;
}

export default function MenuSection() {
  const flavors: MenuItem[] = [
    {
      num: "01",
      title: "SIGNATURE CHOCOLATE",
      description: "Thick, rich, and deeply decadent premium Belgian chocolate that blankets every single crunchy edge of our crispy golden banana chips.",
      colorClass: "group-hover:text-[#4A2E1B]",
      icon: <Sparkles className="w-5 h-5 text-[#4A2E1B]" />,
      bgGlow: "bg-[#4A2E1B]/5"
    },
    {
      num: "02",
      title: "KYOTO MATCHA GLAZE",
      description: "Authentic, earthy Japanese matcha ground finely and melted into a smooth, perfectly balanced sweet coating. A serene and sophisticated crunch.",
      colorClass: "group-hover:text-[#5D6B54]",
      icon: <Leaf className="w-5 h-5 text-[#5D6B54]" />,
      bgGlow: "bg-[#5D6B54]/5"
    },
    {
      num: "03",
      title: "WILD STRAWBERRY MELT",
      description: "Sweet, tangy, and refreshingly fruity glaze that brings a vibrant, colorful burst of real field-fresh berry goodness to the premium chip foundation.",
      colorClass: "group-hover:text-[#C84B31]",
      icon: <Heart className="w-5 h-5 text-[#C84B31]" />,
      bgGlow: "bg-[#C84B31]/5"
    },
    {
      num: "04",
      title: "THE TRIPLE MIX COMBO",
      description: "Why choose one? Mix and match all three legendary glazes in a single luxury box for the ultimate contrast of rich, earthy, and fruity flavor collision.",
      colorClass: "group-hover:text-[#B68D40]",
      icon: <Layers className="w-5 h-5 text-[#B68D40]" />,
      bgGlow: "bg-[#B68D40]/5"
    }
  ];

  return (
    <section 
      id="flavors"
      className="relative bg-[#FFFDF0] text-[#0F0C07] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] pt-24 pb-32 overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16"
      style={{ overflowX: 'clip' }}
    >
      {/* Decorative backdrop luxury shapes */}
      <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#FFC107]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30vw] h-[30vw] bg-[#4A2E1B]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full">
        {/* Section Heading */}
        <div className="text-center mb-16 sm:mb-24 md:mb-32">
          <span className="text-[#4A2E1B] text-xs sm:text-sm uppercase font-black tracking-widest block mb-2">
            The Palette
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[130px] font-black uppercase tracking-tighter leading-none text-[#0F0C07]">
            THE FLAVORS
          </h2>
          <div className="w-16 h-1 bg-[#0F0C07] mx-auto mt-6" />
        </div>

        {/* 4 Flavor Items Vertical List */}
        <div className="flex flex-col border-t border-[#0F0C07]/15">
          {flavors.map((flavor, index) => (
            <motion.div
              key={flavor.num}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between py-10 sm:py-14 border-b border-[#0F0C07]/15 transition-all duration-500 overflow-hidden px-4 sm:px-6 hover:px-8 cursor-pointer rounded-2xl hover:bg-black/[0.01]"
            >
              {/* Dynamic back-glow matching flavor profile */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${flavor.bgGlow}`} />

              {/* Layout: Left/Right */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 md:gap-14 z-10 w-full">
                {/* Number on the left */}
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#0F0C07]/10 group-hover:text-[#0F0C07] transition-colors duration-500 leading-none">
                  {flavor.num}
                </span>

                {/* Text content stacked vertically on the right */}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="p-1 rounded bg-[#0F0C07]/5 group-hover:bg-[#0F0C07]/10 transition-colors duration-500">
                      {flavor.icon}
                    </span>
                    <h3 className={`text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight transition-colors duration-500 ${flavor.colorClass}`}>
                      {flavor.title}
                    </h3>
                  </div>
                  <p className="text-[#0F0C07]/75 font-light text-sm sm:text-base leading-relaxed mt-3 max-w-3xl">
                    {flavor.description}
                  </p>
                </div>
              </div>

              {/* Elegant action tag */}
              <div className="mt-4 sm:mt-0 ml-auto sm:ml-4 z-10 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                <span className="text-xs font-black uppercase tracking-widest text-[#0F0C07]/60 group-hover:text-[#0F0C07] border-b-2 border-current pb-0.5">
                  Deluxe Glaze
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
