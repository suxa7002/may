import React from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { useTranslation } from '../App';
import { useImages } from '../context/ImageContext';

export default function Home() {
  const { t } = useTranslation();
  const { mainImages } = useImages();
  
  // 3D Parallax effect for the hero image
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouse(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative mb-12"
      >
        <div className="absolute -inset-4 bg-mai-purple/20 blur-3xl rounded-full animate-pulse" />
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-light tracking-tighter text-gradient relative drop-shadow-2xl">
          {t.home.title}
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="max-w-2xl space-y-6"
      >
        <p className="text-lg md:text-xl font-serif italic text-mai-beige/80 leading-relaxed">
          "{t.home.intro}"
        </p>
        
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-mai-sunset to-transparent mx-auto" />
        
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">
          {t.home.tagline}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        className="mt-16 relative group cursor-pointer perspective-1000"
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-mai-purple to-mai-sunset rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-lg glass shadow-2xl transition-transform duration-500 ease-out">
          <img 
            src={mainImages.homeHero} 
            alt="Mai Sakurajima Hero" 
            className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mai-night via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-8 left-8 text-left">
            <p className="text-xs uppercase tracking-widest text-mai-sunset mb-2">Atmosphere</p>
            <h2 className="text-3xl font-serif">{t.home.heroTitle}</h2>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

