import { motion } from 'motion/react';
import { Heart, Zap, User } from 'lucide-react';
import { useTranslation } from '../App';

export default function Relationships() {
  const { lang } = useTranslation();
  
  return (
    <div className="space-y-24">
      <header className="text-center max-w-2xl mx-auto space-y-6">
        <h1 className="text-5xl text-gradient">{lang === 'ru' ? 'Связи' : 'Connections'}</h1>
        <p className="text-mai-beige/70 leading-relaxed italic">
          {lang === 'ru' 
            ? "\"В мире, который забывал её, несколько душ держались за неё изо всех сил.\""
            : "\"In a world that was forgetting her, a few souls held on with everything they had.\""}
        </p>
      </header>

      <section className="glass p-8 md:p-16 rounded-[3rem] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-mai-purple/5 to-mai-sunset/5" />
        
        <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-mai-sunset/20 rounded-full text-mai-sunset">
                <Heart size={24} fill="currentColor" />
              </div>
              <h2 className="text-4xl text-mai-sunset">Sakuta Azusagawa</h2>
            </div>
            
            <div className="space-y-6 text-mai-beige/80 leading-relaxed">
              <p>
                {lang === 'ru'
                  ? "Их отношения — якорь всей истории. Все началось с хулигана, который отказался игнорировать девушку-зайчика в библиотеке, и переросло в глубокую, непоколебимую связь."
                  : "Their relationship is the anchor of the story. It began with a rascal who refused to ignore a bunny girl in a library and evolved into a deep, unwavering bond."}
              </p>
              <p>
                {lang === 'ru'
                  ? "Сакута — единственный, кто по-настоящему «видит» Май не как актрису, а как девушку. Их динамика построена на игривых поддразниваниях, жестокой честности и верности, которая бросает вызов законам их мира."
                  : "Sakuta is the only one who truly \"sees\" Mai, not as an actress, but as a girl. Their dynamic is built on playful teasing, brutal honesty, and a loyalty that defies the laws of their world."}
              </p>
              <blockquote className="border-l-2 border-mai-purple pl-6 italic text-mai-purple/80">
                {lang === 'ru' 
                  ? "\"Мне все равно, если весь мир забудет меня, пока ты рядом и помнишь.\""
                  : "\"I don't mind if the whole world forgets me, as long as you're there to remember.\""}
              </blockquote>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ rotateY: 20, rotateX: 10 }}
            className="relative aspect-square rounded-full border-2 border-dashed border-mai-purple/30 p-8 cursor-pointer perspective-1000"
          >
            <div className="w-full h-full rounded-full overflow-hidden glass relative shadow-2xl transition-transform duration-500">
              <img 
                src="https://static.wikia.nocookie.net/aobuta/images/9/9a/Mai_Sakuta_Train.png?format=original" 
                alt="Mai Sakuta Train" 
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mai-night via-transparent to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 p-4 bg-mai-night rounded-full border border-mai-purple/20 translate-x-1/2 -translate-y-1/2 animate-bounce">
              <Zap className="text-mai-sunset" size={20} />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="space-y-12">
        <h2 className="text-3xl text-center text-mai-beige">{lang === 'ru' ? 'Другие связи' : 'Other Connections'}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Kaede Azusagawa", role: lang === 'ru' ? "Сестра Сакуты" : "Sakuta's Sister", desc: lang === 'ru' ? "Май относится к Каэдэ с теплотой старшей сестры, часто становясь тем спокойным присутствием, в котором Каэдэ нуждается." : "Mai treats Kaede with the warmth of an older sister, often being the calm presence Kaede needs during her own struggles." },
            { name: "Nodoka Toyohama", role: lang === 'ru' ? "Сводная сестра" : "Half-Sister", desc: lang === 'ru' ? "Сложные отношения зависти и восхищения, которые в конечном итоге перерастают в искреннюю сестринскую любовь и понимание." : "A complex relationship of envy and admiration that eventually blossoms into genuine sisterly love and understanding." },
            { name: "Rio Futaba", role: lang === 'ru' ? "Ученый" : "The Scientist", desc: lang === 'ru' ? "Логический ум, который помогает объяснить невозможное, создавая основу для Май и Сакуты в их реальности." : "The logical mind who helps explain the impossible, providing the framework for Mai and Sakuta to navigate their reality." }
          ].map((char, i) => (
            <motion.div
              key={char.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, rotateZ: 2 }}
              className="glass p-8 rounded-2xl space-y-4 border-mai-purple/10 hover:border-mai-sunset/30 transition-all cursor-pointer shadow-lg"
            >
              <div className="flex items-center space-x-3">
                <User size={18} className="text-mai-purple" />
                <h3 className="text-xl text-mai-sunset">{char.name}</h3>
              </div>
              <p className="text-xs uppercase tracking-widest text-white/40">{char.role}</p>
              <p className="text-sm text-white/60 leading-relaxed">{char.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

