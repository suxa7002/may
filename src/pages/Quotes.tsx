import { motion } from 'motion/react';
import { Quote as QuoteIcon } from 'lucide-react';
import { useTranslation } from '../App';

export default function Quotes() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-24">
      <header className="text-center space-y-4">
        <h1 className="text-5xl text-gradient">{t.quotes.title}</h1>
        <p className="text-white/40 uppercase tracking-[0.4em] text-xs">{t.quotes.subtitle}</p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {t.quotes.items.map((quote: string, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ 
              rotateY: i % 2 === 0 ? 10 : -10, 
              rotateX: 5, 
              scale: 1.05,
              z: 50
            }}
            className="glass p-10 rounded-3xl relative group hover:bg-white/10 transition-all cursor-pointer shadow-xl perspective-1000"
          >
            <QuoteIcon className="absolute top-6 left-6 text-mai-purple/20 group-hover:text-mai-purple/40 transition-colors" size={40} />
            <p className="relative z-10 text-lg font-serif italic text-mai-beige/90 leading-relaxed pt-4">
              "{quote}"
            </p>
            <div className="mt-6 flex justify-end">
              <div className="h-px w-12 bg-mai-sunset/30" />
            </div>
          </motion.div>
        ))}
      </div>

      <section className="max-w-3xl mx-auto text-center glass p-12 rounded-[3rem] border-mai-sunset/10 shadow-2xl">
        <h2 className="text-2xl text-mai-sunset mb-6">{t.quotes.toneTitle}</h2>
        <p className="text-white/60 leading-relaxed italic">
          {t.quotes.toneDesc}
        </p>
      </section>
    </div>
  );
}

