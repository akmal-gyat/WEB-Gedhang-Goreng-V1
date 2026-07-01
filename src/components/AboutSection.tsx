import { motion } from 'motion/react';
import AnimatedText from './AnimatedText';

export default function AboutSection() {
  // Define floating food assets with premium Unsplash food photography
  const assets = [
    {
      id: 'banana-leaf',
      src: 'https://images.unsplash.com/photo-1589307384813-f66d48feae33?auto=format&fit=crop&q=80&w=400',
      alt: 'Artisanal Green Banana Leaf',
      className: 'top-[4%] left-[4%] w-[110px] sm:w-[160px] aspect-square rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%]',
      floatRange: [-12, 12],
      floatDuration: 5
    },
    {
      id: 'matcha-whisk',
      src: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&q=80&w=400',
      alt: 'Kyoto Matcha Whisk',
      className: 'top-[4%] right-[4%] w-[110px] sm:w-[160px] aspect-square rounded-[70%_30%_30%_70%_/_60%_40%_60%_40%]',
      floatRange: [-10, 10],
      floatDuration: 6
    },
    {
      id: 'chocolate-block',
      src: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400',
      alt: 'Molten Belgian Chocolate',
      className: 'bottom-[8%] left-[8%] w-[90px] sm:w-[140px] aspect-square rounded-[40%_60%_30%_70%_/_40%_50%_50%_60%]',
      floatRange: [-15, 15],
      floatDuration: 5.5
    },
    {
      id: 'fresh-strawberry',
      src: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?auto=format&fit=crop&q=80&w=400',
      alt: 'Glossy Red Strawberry',
      className: 'bottom-[8%] right-[8%] w-[100px] sm:w-[150px] aspect-square rounded-[50%_50%_70%_30%_/_50%_60%_40%_50%]',
      floatRange: [-8, 8],
      floatDuration: 4.5
    }
  ];

  return (
    <section 
      id="story"
      className="relative min-h-screen flex items-center justify-center py-20 bg-[#0F0C07] overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16"
      style={{ overflowX: 'clip' }}
    >
      {/* Decorative center glow */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-[#FFC107]/2 rounded-full blur-[160px] pointer-events-none" />

      {/* FLOATING 3D / ABSTRACT FOOD ASSETS */}
      {assets.map((asset) => (
        <motion.div
          key={asset.id}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`absolute z-10 overflow-hidden border-2 border-[#FFC107]/20 shadow-[0_15px_35px_rgba(0,0,0,0.6)] ${asset.className}`}
        >
          <motion.div
            animate={{ y: asset.floatRange }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: asset.floatDuration,
              ease: 'easeInOut'
            }}
            className="w-full h-full"
          >
            <img 
              src={asset.src} 
              alt={asset.alt}
              className="w-full h-full object-cover select-none filter contrast-125 brightness-90 hover:scale-110 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </motion.div>
      ))}

      {/* CORE CONTENT */}
      <div className="relative z-20 max-w-4xl mx-auto w-full text-center flex flex-col items-center justify-center gap-10">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <span className="text-[#FFC107] text-xs sm:text-sm uppercase font-black tracking-widest block mb-2">
            The Heritage
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[110px] font-black uppercase hero-heading tracking-tight leading-none">
            OUR STORY
          </h2>
        </motion.div>

        {/* Character-by-character text reveal paragraph */}
        <div className="w-full max-w-2xl px-2">
          <AnimatedText 
            text="Born in the heart of Yogyakarta, Gedhang Goereng YK redefines the traditional banana snack. We select only the finest local bananas, fry them to absolute crispy perfection, and blanket them in an elite layer of premium melted glazes. This isn't just a snack; it's a multi-sensory crunch experience."
            className="text-[#F7EFE5] font-medium text-center leading-relaxed font-outfit text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide"
          />
        </div>

        {/* Dynamic decorative emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.4, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#FFC107] to-transparent mt-4"
        />
      </div>
    </section>
  );
}
