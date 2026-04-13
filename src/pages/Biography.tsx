import { motion } from 'motion/react';
import { useTranslation } from '../App';

export default function Biography() {
  const { t, lang } = useTranslation();
  
  return (
    <div className="max-w-4xl mx-auto space-y-24">
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          whileHover={{ rotateY: 15, rotateX: -5, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative aspect-[3/4] rounded-2xl overflow-hidden glass shadow-xl cursor-pointer perspective-1000"
        >
          <img 
            src="https://static.wikia.nocookie.net/aobuta/images/3/3e/Mai_School_Uniform.png?format=original" 
            alt="Mai Sakurajima School Uniform" 
            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mai-night via-transparent to-transparent opacity-60" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl text-mai-sunset">{t.bio.actress}</h2>
          <p className="text-mai-beige/80 leading-relaxed">
            {lang === 'ru' 
              ? "Май Сакурадзима — не просто ученица старшей школы Минэгахара; она национальная икона, актриса, выросшая в центре внимания. Однако за славой скрывается девушка, которая искала нормальной жизни, но обнаружила, что ускользает от самой реальности."
              : "Mai Sakurajima is not just a student at Minegahara High School; she is a national icon, a child actress who grew up in the spotlight. Yet, behind the fame lies a girl who sought a normal life, only to find herself slipping away from reality itself."}
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm uppercase tracking-widest text-white/40">
            <div>
              <p className="text-mai-purple">{lang === 'ru' ? 'Роль' : 'Role'}</p>
              <p>{lang === 'ru' ? 'Студентка / Актриса' : 'Student / Actress'}</p>
            </div>
            <div>
              <p className="text-mai-purple">{lang === 'ru' ? 'Статус' : 'Status'}</p>
              <p>{lang === 'ru' ? 'Таинственный' : 'Mysterious'}</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl text-mai-purple mb-6">{t.bio.personality}</h2>
          <p className="text-mai-beige/80 italic">
            {lang === 'ru' 
              ? "\"Зрелая, сдержанная и острая на язык, но глубоко заботящаяся о тех, кому удается её увидеть.\""
              : "\"Mature, composed, and sharp-tongued, yet deeply caring for those who manage to see her.\""}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.bio.traits.map((trait: any, i: number) => (
            <motion.div
              key={trait.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10, rotateZ: i % 2 === 0 ? 1 : -1 }}
              className="glass p-8 rounded-xl border-mai-purple/20 shadow-lg"
            >
              <h3 className="text-xl text-mai-sunset mb-2">{trait.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{trait.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="glass p-12 rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-mai-purple/10 blur-3xl rounded-full -mr-32 -mt-32" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative z-10 space-y-8"
        >
          <h2 className="text-4xl text-mai-sunset text-center">{t.bio.invisible}</h2>
          <div className="max-w-2xl mx-auto space-y-6 text-mai-beige/80 leading-relaxed text-center">
            <p>
              {lang === 'ru'
                ? "Все началось с костюма зайчика в библиотеке. Отчаянная попытка быть замеченной миром, который начал забывать её. Подростковый синдром — проявление её внутреннего желания сбежать от всеобщего внимания — превратился в кошмар, где она стала невидимой для всех."
                : "It started with a bunny girl outfit in a library. A desperate attempt to be noticed by a world that had begun to forget her. Adolescence Syndrome—a manifestation of her inner desire to escape the spotlight—turned into a nightmare where she became invisible to everyone."}
            </p>
            <p className="italic text-mai-purple">
              {lang === 'ru' ? "\"Если мир забудет тебя, будешь ли ты существовать?\"" : "\"If the world forgets you, do you even exist?\""}
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

