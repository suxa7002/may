import { motion } from 'motion/react';
import { Info, Coffee, History, MessageCircle } from 'lucide-react';
import { useTranslation } from '../App';

export default function Extra() {
  const { t, lang } = useTranslation();
  
  return (
    <div className="space-y-32">
      {/* Adolescence Syndrome */}
      <section className="space-y-12">
        <div className="flex items-center justify-center space-x-4">
          <Info className="text-mai-purple" size={32} />
          <h2 className="text-4xl text-gradient">{t.extra.syndromeTitle}</h2>
        </div>
        <div className="glass p-12 rounded-[3rem] max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center shadow-2xl">
          <div className="space-y-6">
            <h3 className="text-2xl text-mai-sunset">{lang === 'ru' ? 'Феномен' : 'The Phenomenon'}</h3>
            <p className="text-white/70 leading-relaxed">
              {t.extra.syndromeDesc}
            </p>
            <ul className="space-y-3 text-sm text-mai-beige/60">
              <li className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-mai-purple rounded-full" />
                <span>{lang === 'ru' ? 'Вызвано социальным давлением' : 'Triggered by social pressure'}</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-mai-purple rounded-full" />
                <span>{lang === 'ru' ? 'Бросает вызов науке' : 'Defies scientific explanation'}</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-mai-purple rounded-full" />
                <span>{lang === 'ru' ? 'Решается через рост личности' : 'Resolved through emotional growth'}</span>
              </li>
            </ul>
          </div>
          <motion.div 
            whileHover={{ rotateY: 10, rotateX: -10, scale: 1.05 }}
            className="relative aspect-square rounded-2xl overflow-hidden glass cursor-pointer perspective-1000 shadow-xl"
          >
            <img 
              src="https://static.wikia.nocookie.net/aobuta/images/5/5f/Mai_Bunny_Library.png?format=original" 
              alt="Mai Bunny Library" 
              className="w-full h-full object-cover opacity-40 hover:opacity-60 transition-opacity duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
              <p className="text-xl font-serif italic text-mai-purple">
                {lang === 'ru' ? "\"Если тебя никто не видит, существуешь ли ты?\"" : "\"If nobody sees you, are you even there?\""}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Daily Life */}
      <section className="space-y-12">
        <div className="flex items-center justify-center space-x-4">
          <Coffee className="text-mai-sunset" size={32} />
          <h2 className="text-4xl text-gradient">{t.extra.dailyTitle}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: lang === 'ru' ? "Утренняя рутина" : "Morning Routine", desc: lang === 'ru' ? "Тихая чашка чая, пока мир еще спит. Актриса готовится к своей роли ученицы." : "A quiet cup of tea before the world wakes up. The actress prepares for her role as a student." },
            { title: lang === 'ru' ? "Библиотека" : "The Library", desc: lang === 'ru' ? "Её убежище. Место книг и тишины, где она впервые встретила мальчика, который изменил всё." : "Her sanctuary. A place of books and silence, where she first met the boy who would change everything." },
            { title: lang === 'ru' ? "Вечерние прогулки" : "Evening Walks", desc: lang === 'ru' ? "Прогулка по Эносиме, когда солнце опускается за горизонт, ощущая прохладный морской бриз." : "Walking through Enoshima as the sun dips below the horizon, feeling the cool sea breeze." }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10, rotateX: 5 }}
              className="glass p-8 rounded-2xl border-mai-sunset/10 hover:bg-white/10 transition-all cursor-pointer shadow-lg"
            >
              <h3 className="text-xl text-mai-sunset mb-4">{item.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Memories */}
      <section className="space-y-12">
        <div className="flex items-center justify-center space-x-4">
          <History className="text-mai-beige" size={32} />
          <h2 className="text-4xl text-gradient">{t.extra.memoriesTitle}</h2>
        </div>
        <div className="space-y-8">
          {[
            { date: lang === 'ru' ? "Первая встреча" : "The First Meeting", event: lang === 'ru' ? "Девушка-зайчик в библиотеке. Мальчик, который заметил её, когда никто другой не видел." : "A bunny girl in a library. A boy who noticed her when no one else did." },
            { date: lang === 'ru' ? "Признание" : "The Confession", event: lang === 'ru' ? "На школьной крыше, крича всему миру, чтобы они не забывали её." : "On the school rooftop, shouting to the world so they wouldn't forget her." },
            { date: lang === 'ru' ? "Воссоединение" : "The Reunion", event: lang === 'ru' ? "Поиск друг друга снова после того, как мир перезагрузился. Сдержанное обещание." : "Finding each other again after the world had reset. A promise kept." }
          ].map((memory, i) => (
            <motion.div
              key={memory.date}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-8 max-w-3xl mx-auto"
            >
              <div className="text-right w-1/3">
                <p className="text-xs uppercase tracking-widest text-mai-purple">{memory.date}</p>
              </div>
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-mai-sunset to-transparent" />
              <div className="w-2/3">
                <p className="text-mai-beige/80 italic">{memory.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fan Messages */}
      <section className="space-y-12">
        <div className="flex items-center justify-center space-x-4">
          <MessageCircle className="text-mai-purple" size={32} />
          <h2 className="text-4xl text-gradient">{t.extra.fanTitle}</h2>
        </div>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="glass p-8 rounded-2xl italic text-white/50 text-center shadow-xl">
            {lang === 'ru' ? "\"Спасибо за то, что научила нас тому, что быть увиденным — это дар, а быть помнимым — это чудо.\"" : "\"Thank you for teaching us that being seen is a gift, and being remembered is a miracle.\""}
          </div>
          <div className="glass p-8 rounded-2xl italic text-white/50 text-center shadow-xl">
            {lang === 'ru' ? "\"Твоя сила и уязвимость вдохновили меня быть более честным со своими чувствами.\"" : "\"Your strength and vulnerability inspired me to be more honest with my own feelings.\""}
          </div>
          <div className="flex justify-center mt-12">
            <button className="px-8 py-3 rounded-full border border-mai-purple/30 text-mai-purple hover:bg-mai-purple hover:text-mai-night transition-all uppercase tracking-widest text-xs">
              {lang === 'ru' ? 'Оставить сообщение' : 'Leave a Message'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

