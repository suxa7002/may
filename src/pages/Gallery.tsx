import { motion } from 'motion/react';
import { useTranslation } from '../App';
import { useImages } from '../context/ImageContext';

export default function Gallery() {
  const { lang } = useTranslation();
  const { galleryImages } = useImages();

  // Group images by section
  const sections = Array.from(new Set(galleryImages.map(img => lang === 'ru' ? img.sectionRu : img.sectionEn)));

  return (
    <div className="space-y-24">
      <header className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl text-gradient">{lang === 'ru' ? 'Визуальные воспоминания' : 'Visual Memories'}</h1>
        <p className="text-white/40 uppercase tracking-[0.4em] text-xs">{lang === 'ru' ? 'Коллекция моментов, застывших во времени' : 'A collection of moments frozen in time'}</p>
      </header>

      {sections.map((sectionName) => {
        const items = galleryImages.filter(img => (lang === 'ru' ? img.sectionRu : img.sectionEn) === sectionName);
        
        return (
          <section key={sectionName} className="space-y-12">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-serif text-mai-beige border-l-2 border-mai-purple pl-6"
            >
              {sectionName}
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
                  className="group relative perspective-1000 cursor-pointer"
                >
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden glass shadow-xl transition-all duration-500">
                    <img 
                      src={item.url} 
                      alt={lang === 'ru' ? item.titleRu : item.titleEn} 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-mai-night/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <h3 className="text-xl text-mai-sunset mb-1">{lang === 'ru' ? item.titleRu : item.titleEn}</h3>
                      <p className="text-sm text-white/60 italic">{lang === 'ru' ? item.captionRu : item.captionEn}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

