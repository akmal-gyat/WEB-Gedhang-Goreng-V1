import { motion } from 'motion/react';
import { ChefHat, ArrowDown, MapPin } from 'lucide-react';
import LookAtCursor from './LookAtCursor';
import OrderButton from './OrderButton';

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className="relative h-screen min-h-[600px] w-full flex flex-col justify-between overflow-hidden bg-[#0F0C07]"
      style={{ overflowX: 'clip' }}
    >
      {/* Decorative luxury backgrounds */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#FFC107]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#4A2E1B]/20 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. NAVBAR */}
      <motion.nav 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-30 w-full px-6 md:px-10 pt-6 md:pt-8 flex items-center justify-between"
      >
        {/* Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFC107] to-[#4A2E1B] flex items-center justify-center shadow-lg shadow-black/40">
            <ChefHat className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-black text-sm text-white tracking-widest block leading-none">GEDHANG</span>
            <span className="font-medium text-[10px] text-[#FFC107] tracking-widest block">GOERENG YK</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden sm:flex items-center gap-8 md:gap-12">
          {[
            { label: 'Story', target: 'story' },
            { label: 'Flavors', target: 'flavors' },
            { label: 'Packages', target: 'packages' }
          ].map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.target)}
              className="text-[#F7EFE5] font-medium text-xs uppercase tracking-widest hover:opacity-70 transition-opacity duration-200 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right CTA / Location */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1.5 text-xs text-[#E6D5B8]/80 font-light tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-[#FFC107]" />
            <span>YOGYAKARTA, ID</span>
          </div>
          <button
            onClick={() => scrollToSection('packages')}
            className="text-white border border-[#FFC107]/40 hover:border-[#FFC107] bg-white/5 hover:bg-[#FFC107]/10 px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-200 cursor-pointer"
          >
            ORDER NOW
          </button>
        </div>
      </motion.nav>

      {/* 2. HERO PORTRAIT (3D TILTED MAIN VISUAL) */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 bottom-0 w-[280px] sm:w-[440px] lg:w-[520px] pointer-events-none">
        <LookAtCursor className="pointer-events-auto">
          <motion.div
            initial={{ y: 150, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[4/5] flex items-end justify-center select-none"
          >
            {/* Ambient golden glow ring behind the banana chip */}
            <div className="absolute top-[20%] w-[80%] aspect-square bg-[#FFC107]/15 rounded-full blur-3xl" />
            
            <img 
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png" 
              alt="Premium Crispy Banana Chip with Chocolate Glaze" 
              className="w-full h-auto object-contain max-h-[85vh] drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] filter brightness-110 saturate-110"
              referrerPolicy="no-referrer"
              draggable="false"
            />
          </motion.div>
        </LookAtCursor>
      </div>

      {/* 3. HERO HEADING */}
      <div className="my-auto w-full flex flex-col justify-center items-center relative z-20 pt-8">
        <div className="overflow-hidden w-full text-center px-4">
          <motion.h1 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[13vw] sm:text-[14vw] md:text-[15vw] lg:text-[16.5vw]"
          >
            GEDHANG GOERENG
          </motion.h1>
        </div>
      </div>

      {/* 4. BOTTOM BAR */}
      <div className="relative z-20 px-6 sm:px-10 pb-7 sm:pb-8 md:pb-10 flex items-end justify-between w-full max-w-7xl mx-auto">
        {/* Left Descriptive Column */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col items-start text-left"
        >
          <p className="text-[#E6D5B8] font-light uppercase tracking-wide leading-snug text-[10px] sm:text-xs max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
            a premium crispy banana chip artisan fused with luxurious, slow-melted premium glazes.
          </p>
          <div className="flex gap-2 mt-4 text-[10px] text-[#FFC107] font-bold tracking-widest uppercase">
            <span>CRISP</span>
            <span>•</span>
            <span>GLAZE</span>
            <span>•</span>
            <span>YOGYA</span>
          </div>
        </motion.div>

        {/* Scroll down prompt (Desktop only) */}
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="hidden lg:flex flex-col items-center gap-2 cursor-pointer pb-2"
          onClick={() => scrollToSection('story')}
        >
          <span className="text-[10px] uppercase font-black tracking-widest text-[#E6D5B8]/40">Explore Crunch</span>
          <ArrowDown className="w-4 h-4 text-[#FFC107]/50" />
        </motion.div>

        {/* Right Order Action Column */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col items-end"
        >
          <OrderButton />
        </motion.div>
      </div>
    </section>
  );
}
