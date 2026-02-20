import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence, useMotionValue } from "framer-motion";
import { 
  Terminal,
  Menu,
  X,
  LucideIcon,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Zap,
  Layout,
  Github,
  Twitter,
  MessageSquare,
  Box,
  Layers,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PerspectiveCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 100, damping: 30 });

  function onMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`preserve-3d ${className}`}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${scrolled ? "bg-black/40 backdrop-blur-2xl border-b border-white/5 py-3" : "bg-transparent py-8"}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-4 group cursor-pointer"
        >
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center transform group-hover:rotate-[360deg] transition-transform duration-1000 shadow-[0_0_30px_rgba(57,255,20,0.3)]">
            <Terminal className="text-black w-7 h-7" />
          </div>
          <span className="text-2xl font-bold font-display tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">BLOCK<span className="text-primary">FORGE</span></span>
        </motion.div>

        <div className="hidden md:flex items-center gap-12">
          {["Услуги", "Портфолио", "Команда"].map((item) => (
            <motion.a 
              key={item}
              href={`#${item}`}
              whileHover={{ y: -2, color: "#39ff14" }}
              className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 transition-colors"
            >
              {item}
            </motion.a>
          ))}
          <Button className="bg-primary text-black hover:bg-white font-bold px-10 h-14 rounded-2xl transition-all shadow-[0_10px_30px_-10px_rgba(57,255,20,0.5)] active:scale-95 group">
            ОБСУДИТЬ ПРОЕКТ <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <button className="md:hidden text-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-3xl z-[200] flex flex-col items-center justify-center gap-12"
          >
             <button className="absolute top-8 right-8 text-primary" onClick={() => setMobileMenuOpen(false)}><X size={40} /></button>
             {["Услуги", "Портфолио", "Команда"].map(item => (
               <a key={item} href="#" className="text-4xl font-bold tracking-tighter" onClick={() => setMobileMenuOpen(false)}>{item}</a>
             ))}
             <Button className="w-64 bg-primary text-black font-bold text-2xl py-10 rounded-3xl">СВЯЗАТЬСЯ</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 10]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 perspective-1000">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div style={{ y, rotate }} className="scale-110">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background z-10" />
           <img src="/images/hero-bg.png" className="w-full h-full object-cover brightness-[0.25] scale-125 transition-transform duration-[10s] hover:scale-100" />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="preserve-3d"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary/5 border border-primary/10 mb-12 backdrop-blur-3xl animate-float-3d">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold uppercase tracking-[0.4em] text-primary/80">Виртуальный Архитектор Нового Поколения</span>
            </div>
            
            <h1 className="text-5xl md:text-[8rem] font-bold font-display mb-12 leading-[1.1] tracking-tight preserve-3d">
              <motion.span 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="block text-white hover:text-primary transition-colors duration-700 ease-in-out cursor-default"
              >
                СОЗДАЕМ
              </motion.span>
              <motion.span 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-400 to-secondary text-glow-strong hover:brightness-125 transition-all duration-700 ease-in-out cursor-default"
              >
                МИРЫ
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-20 leading-relaxed font-medium tracking-normal hover:text-white transition-colors duration-700 ease-in-out"
            >
              Мы создаем сложные технические шедевры внутри Minecraft, <br className="hidden md:block" /> где каждый блок — это безупречный код.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="flex flex-col md:flex-row justify-center gap-8"
            >
              <PerspectiveCard>
                <Button size="xl" className="bg-primary text-black hover:bg-white font-bold text-3xl px-16 h-24 rounded-3xl shadow-[0_20px_50px_rgba(57,255,20,0.4)] transition-all">
                  НАЧАТЬ ПРОЕКТ
                </Button>
              </PerspectiveCard>
              <Button size="xl" variant="outline" className="border-white/5 hover:bg-white/5 font-bold text-3xl px-16 h-24 rounded-3xl backdrop-blur-3xl">
                ПОРТФОЛИО
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay }: FeatureCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
      transition={{ 
        delay: delay * 1.5, 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="group perspective-1000"
    >
      <PerspectiveCard className="h-full">
        <div className="glass-premium p-12 rounded-[40px] h-full relative group transition-all duration-700 hover:border-primary/50">
          <div className="w-24 h-24 rounded-[30px] bg-primary/10 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
            <Icon className="w-12 h-12 text-primary" />
          </div>
          <h3 className="text-3xl font-bold mb-6 tracking-tight group-hover:text-primary transition-all duration-700 ease-out hover:translate-x-2">{title}</h3>
          <p className="text-gray-400 text-lg leading-relaxed font-medium group-hover:text-gray-200 transition-colors">
            {description}
          </p>
          <div className="mt-12 flex items-center gap-4 text-primary font-bold tracking-widest text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
             СТАТУС: АКТИВЕН <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </PerspectiveCard>
    </motion.div>
  );
};

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={ref} className="py-60 bg-background relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="grid lg:grid-cols-2 gap-24 items-end mb-40"
        >
          <div className="relative z-10">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-8 px-8 py-2 text-sm rounded-2xl tracking-[0.2em] font-bold uppercase hover:bg-primary/20 transition-all duration-500 cursor-default">Наши Возможности</Badge>
            <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight uppercase relative z-10 hover:text-primary transition-all duration-700 ease-in-out cursor-default group/title">
              МЫ СОЗДАЕМ <br /> <span className="text-gray-800/30 group-hover/title:text-gray-700/50 transition-all duration-700 ease-in-out">НЕВОЗМОЖНОЕ</span>
            </h2>
          </div>
          <p className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed max-w-md relative z-20 hover:text-white transition-all duration-700 ease-in-out">
            От кастомных JVM-оптимизаций до нейронных сетей внутри игровых движков. Мы не знаем границ.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 relative z-10">
          <FeatureCard icon={Cpu} title="Ядро Системы" description="Разработка нативных плагинов с прямым доступом к памяти для экстремальной производительности." delay={0.1} />
          <FeatureCard icon={Layers} title="Логика Модов" description="Сложные многоуровневые моды, интегрирующие внешние API и кастомные рендеры." delay={0.2} />
          <FeatureCard icon={ShieldCheck} title="Защита Системы" description="Квантово-устойчивая защита игровых данных и транзакций внутри вашего сервера." delay={0.3} />
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-40 bg-black/50 border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-20 mb-40">
           <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-4 mb-10">
                <Terminal className="text-primary w-14 h-14" />
                <span className="text-5xl font-bold font-display tracking-tightest">BLOCKFORGE</span>
              </div>
              <p className="text-2xl text-gray-500 max-w-lg font-medium tracking-tight">
                Инженерия Цифровой Вечности. <br /> Создано элитой для визионеров.
              </p>
           </div>
           <div className="flex flex-wrap justify-center gap-12 md:gap-24">
              {["Github", "Discord", "Telegram"].map(social => (
                <motion.a key={social} whileHover={{ y: -2, color: "#39ff14" }} className="text-2xl font-bold uppercase tracking-widest text-gray-600 cursor-pointer">{social}</motion.a>
              ))}
           </div>
        </div>
        
        <div className="pt-20 border-t border-white/5 flex flex-col md:row justify-between items-center gap-10">
          <span className="text-gray-700 font-bold uppercase tracking-[1em] text-[12px]">© 2026 BLOCKFORGE // THE_APEX_ENGINE</span>
          <div className="flex gap-12 text-gray-700 font-bold uppercase tracking-widest text-[12px]">
             <a href="#" className="hover:text-white transition-colors">Политика безопасности</a>
             <a href="#" className="hover:text-white transition-colors">Правовая информация</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Petals = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[99] overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            top: -20, 
            left: `${Math.random() * 100}%`,
            scale: Math.random() * 0.5 + 0.5,
            rotate: Math.random() * 360
          }}
          animate={{
            top: "110%",
            left: `${(Math.random() * 100)}%`,
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 20
          }}
          style={{
            position: 'absolute',
            width: '15px',
            height: '20px',
            background: 'linear-gradient(135deg, #ffb7c5 0%, #ff9aae 100%)',
            borderRadius: '150% 0 150% 0',
            opacity: 0.6,
            filter: 'blur(1px)'
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30">
      <Petals />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[200] shadow-[0_0_20px_#39ff14]" style={{ scaleX }} />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <section className="py-60 container mx-auto px-6 text-center">
           <motion.div 
             whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
             viewport={{ once: true }}
             className="glass-premium p-24 md:p-48 rounded-[80px] relative overflow-hidden group"
           >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative z-10">
                <h2 className="text-7xl md:text-[12rem] font-bold mb-16 tracking-tightest leading-none">ГОТОВЫ <br /> <span className="text-primary">ВЗЛЕТАТЬ?</span></h2>
                <Button size="xl" className="bg-primary text-black hover:bg-white font-bold text-4xl px-20 h-32 rounded-[40px] shadow-[0_30px_100px_rgba(57,255,20,0.5)] transition-all transform hover:-translate-y-4">
                   СВЯЗАТЬСЯ С НАМИ
                </Button>
              </div>
           </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
