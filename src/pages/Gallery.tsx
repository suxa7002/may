import { motion } from 'motion/react';
import { useTranslation } from '../App';

const getGalleryItems = (lang: string) => [
  { section: lang === 'ru' ? "Моменты в костюме зайчика" : "Bunny Girl Moments", items: [
    { id: 1, title: lang === 'ru' ? "Библиотека" : "The Library", caption: lang === 'ru' ? "Где все началось. Тихая мольба о внимании." : "Where it all began. A silent plea for attention.", url: "https://static.wikia.nocookie.net/aobuta/images/5/5f/Mai_Bunny_Library.png?format=original" },
    { id: 2, title: lang === 'ru' ? "Взгляд в сумерках" : "Twilight Gaze", caption: lang === 'ru' ? "Взгляд на мир, который её не видит." : "Looking out at a world that doesn't see her.", url: "https://static.wikia.nocookie.net/aobuta/images/7/7a/Mai_Sakurajima_Bunny_Art.png?format=original" }
  ]},
  { section: lang === 'ru' ? "Школьная жизнь" : "School Life", items: [
    { id: 3, title: lang === 'ru' ? "Тихие коридоры" : "Quiet Hallways", caption: lang === 'ru' ? "Обычная ученица в необычной ситуации." : "A normal student in an abnormal situation.", url: "https://static.wikia.nocookie.net/aobuta/images/3/3e/Mai_School_Uniform.png?format=original" },
    { id: 4, title: lang === 'ru' ? "Бриз на крыше" : "Rooftop Breezes", caption: lang === 'ru' ? "Поиск покоя над шумом мира." : "Finding peace above the noise of the world.", url: "https://static.wikia.nocookie.net/aobuta/images/8/8d/Mai_School_Side.png?format=original" }
  ]},
  { section: lang === 'ru' ? "Эмоциональные сцены" : "Emotional Scenes", items: [
    { id: 5, title: lang === 'ru' ? "Отражения в дожде" : "Rainy Reflections", caption: lang === 'ru' ? "Когда тяжесть невидимости становится невыносимой." : "When the weight of invisibility becomes too much.", url: "https://static.wikia.nocookie.net/aobuta/images/2/2b/Mai_Rain.png?format=original" },
    { id: 6, title: lang === 'ru' ? "Угасающий свет" : "Fading Light", caption: lang === 'ru' ? "Момент уязвимости в лучах заходящего солнца." : "A moment of vulnerability in the setting sun.", url: "https://static.wikia.nocookie.net/aobuta/images/6/6c/Mai_Sunset.png?format=original" }
  ]},
  { section: lang === 'ru' ? "Романтические моменты" : "Romantic Moments", items: [
    { id: 7, title: lang === 'ru' ? "Обещание" : "The Promise", caption: lang === 'ru' ? "Связь, которая превосходит память." : "A bond that transcends memory.", url: "https://static.wikia.nocookie.net/aobuta/images/9/9a/Mai_Sakuta_Train.png?format=original" },
    { id: 8, title: lang === 'ru' ? "Тепло" : "Warmth", caption: lang === 'ru' ? "Поиск дома в чужом сердце." : "Finding a home in someone else's heart.", url: "https://static.wikia.nocookie.net/aobuta/images/1/1d/Mai_Sakuta_Beach.png?format=original" }
  ]}
];

export default function Gallery() {
  const { lang } = useTranslation();
  const galleryItems = getGalleryItems(lang);

  return (
    <div className="space-y-24">
      <header className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl text-gradient">{lang === 'ru' ? 'Визуальные воспоминания' : 'Visual Memories'}</h1>
        <p className="text-white/40 uppercase tracking-[0.4em] text-xs">{lang === 'ru' ? 'Коллекция моментов, застывших во времени' : 'A collection of moments frozen in time'}</p>
      </header>

      {galleryItems.map((group, groupIndex) => (
        <section key={group.section} className="space-y-12">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-serif text-mai-beige border-l-2 border-mai-purple pl-6"
          >
            {group.section}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {group.items.map((item, i) => (
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
                    alt={item.title} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mai-night/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <h3 className="text-xl text-mai-sunset mb-1">{item.title}</h3>
                    <p className="text-sm text-white/60 italic">{item.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

