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
  Cpu,
  MessageCircle,
  Clock,
  Globe,
  Star,
  Search,
  FileText,
  Code,
  CheckCircle,
  Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderModal } from "@/components/order-modal";

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

const Petals = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            top: -20, 
            left: `${Math.random() * 100}%`,
            rotate: Math.random() * 360,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            top: '120%',
            left: `${(Math.random() * 20 - 10) + (i * 5)}%`,
            rotate: Math.random() * 1000,
          }}
          transition={{ 
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
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
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30">
      <Petals />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[200] shadow-[0_0_20px_#39ff14]" style={{ scaleX }} />
      <Navbar onOpenOrder={() => setIsOrderModalOpen(true)} />
      <main>
        <Hero onOpenOrder={() => setIsOrderModalOpen(true)} />
        <Stats />
        <Services />
        <WorkProcess />
        <Portfolio />
        <Pricing onOpenOrder={() => setIsOrderModalOpen(true)} />
        <Team />
        <Reviews />
        <FAQ />
        <CTA onOpenOrder={() => setIsOrderModalOpen(true)} />
      </main>
      <Footer />
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />
    </div>
  );
}

const Navbar = ({ onOpenOrder }: { onOpenOrder: () => void }) => {
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
          {["Услуги", "Портфолио", "Цены", "Команда"].map((item) => (
            <motion.a 
              key={item}
              href={`#${item === "Услуги" ? "services" : item === "Портфолио" ? "portfolio" : item === "Цены" ? "pricing" : "team"}`}
              whileHover={{ y: -2, color: "#39ff14" }}
              className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 transition-colors"
            >
              {item}
            </motion.a>
          ))}
          <Button 
            onClick={onOpenOrder}
            className="bg-primary text-black hover:bg-white font-bold px-10 h-14 rounded-2xl transition-all shadow-[0_10px_30px_-10px_rgba(57,255,20,0.5)] active:scale-95 group"
          >
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
             {["Услуги", "Портфолио", "Цены", "Команда"].map(item => (
               <a key={item} href={`#${item === "Услуги" ? "services" : item === "Портфолио" ? "portfolio" : item === "Цены" ? "pricing" : "team"}`} className="text-4xl font-bold tracking-tighter" onClick={() => setMobileMenuOpen(false)}>{item}</a>
             ))}
             <Button 
               onClick={() => {
                 setMobileMenuOpen(false);
                 onOpenOrder();
               }}
               className="w-64 bg-primary text-black font-bold text-2xl py-10 rounded-3xl"
             >
               СВЯЗАТЬСЯ
             </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onOpenOrder }: { onOpenOrder: () => void }) => {
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
            <div className="inline-flex items-center gap-3 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl bg-primary/5 border border-primary/10 mb-8 md:mb-12 backdrop-blur-3xl animate-float-3d">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] text-primary/80">Профессиональная разработка для Minecraft</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-[8rem] font-bold font-display mb-8 md:mb-12 leading-[1.1] tracking-tight preserve-3d">
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
                СЕРВЕРЫ
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-20 leading-relaxed font-medium tracking-normal hover:text-white transition-colors duration-700 ease-in-out"
            >
              Создаем серверы мечты для 1000+ игроков. <br className="hidden md:block" /> Плагины, которые меняют игру навсегда.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 px-4"
            >
              <PerspectiveCard className="w-full sm:w-auto">
                <Button 
                  onClick={onOpenOrder}
                  size="lg" 
                  className="w-full sm:w-auto bg-primary text-black hover:bg-white font-bold text-xl md:text-3xl px-8 md:px-16 h-16 md:h-24 rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(57,255,20,0.4)] transition-all"
                >
                  НАЧАТЬ ПРОЕКТ
                </Button>
              </PerspectiveCard>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/5 hover:bg-white/5 font-bold text-xl md:text-3xl px-8 md:px-16 h-16 md:h-24 rounded-2xl md:rounded-3xl backdrop-blur-3xl">
                ПОРТФОЛИО
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: "Проектов завершено", value: 150, suffix: "+" },
    { label: "Довольных клиентов", value: 50, suffix: "+" },
    { label: "Время работы", value: 99.9, suffix: "%" },
    { label: "Техподдержка", value: "24/7", suffix: "" },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <StatItem key={idx} stat={stat} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ stat, delay }: { stat: any; delay: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      if (typeof stat.value === "number") {
        let start = 0;
        const end = stat.value;
        const duration = 2000;
        const increment = end / (duration / 16);
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, 16);
        return () => clearInterval(timer);
      }
    }
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.8 }}
      className="relative group"
    >
      <div className="glass-premium p-8 rounded-3xl border border-white/5 text-center transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(57,255,20,0.15)] group-hover:-translate-y-2">
        <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
          <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-hover:from-primary group-hover:to-green-400 transition-all duration-500">
            {typeof stat.value === "number" ? (stat.value % 1 === 0 ? Math.floor(count) : count.toFixed(1)) : stat.value}
            {stat.suffix}
          </span>
        </div>
        <div className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-gray-500 group-hover:text-primary/80 transition-colors duration-500">
          {stat.label}
        </div>
      </div>
    </motion.div>
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
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-8 px-8 py-2 text-sm rounded-2xl tracking-[0.2em] font-bold uppercase hover:bg-primary/20 transition-all duration-500 cursor-default">Наши услуги</Badge>
            <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight uppercase relative z-10 hover:text-primary transition-all duration-700 ease-in-out cursor-default group/title">
              ДЕЛАЕМ ВАШ <br /> <span className="text-gray-800/30 group-hover/title:text-gray-700/50 transition-all duration-700 ease-in-out">ПРОЕКТ</span>
            </h2>
          </div>
          <p className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed max-w-md relative z-20 hover:text-white transition-all duration-700 ease-in-out">
            Превращаем идеи в код. Каждый проект - это технический шедевр.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 relative z-10">
          <FeatureCard icon={Cpu} title="Плагины" description="Разработка кастомных плагинов для Bukkit, Spigot, Paper. От простых команд до сложных игровых механик." delay={0.1} />
          <FeatureCard icon={Layers} title="Моды" description="Создание модов для Forge и Fabric. Новые блоки, предметы, измерения и игровые системы." delay={0.2} />
          <FeatureCard icon={ShieldCheck} title="Серверы" description="Настройка и оптимизация серверов. Защита от читеров, настройка производительности." delay={0.3} />
        </div>
      </div>
    </section>
  );
};

const WorkProcess = () => {
  const steps = [
    {
      icon: Search,
      title: "Анализ ТЗ",
      description: "Изучаем ваши требования, анализируем конкурентов, составляем техническое задание.",
      duration: "1 день"
    },
    {
      icon: FileText,
      title: "Прототип",
      description: "Создаем архитектуру, проектируем базы данных, показываем первые результаты.",
      duration: "2-3 дня"
    },
    {
      icon: Code,
      title: "Разработка",
      description: "Пишем чистый код, оптимизируем производительность, реализуем все фичи.",
      duration: "1-4 недели"
    },
    {
      icon: CheckCircle,
      title: "Тестирование",
      description: "Ищем баги, проводим стресс-тесты, проверяем на реальных игроках.",
      duration: "3-5 дней"
    },
    {
      icon: Rocket,
      title: "Запуск",
      description: "Запускаем проект, настраиваем мониторинг, обеспечиваем поддержку 24/7.",
      duration: "Поддержка"
    }
  ];

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const lineHeight = useSpring(useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="process" ref={ref} className="py-60 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-40">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-8 px-8 py-2 text-sm rounded-2xl tracking-[0.2em] font-bold uppercase cursor-default">Процесс</Badge>
          <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight uppercase cursor-default">
            КАК МЫ <span className="text-gray-800/30">РАБОТАЕМ</span>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 hidden md:block" />
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-1/2 top-0 w-px bg-primary -translate-x-1/2 z-10 hidden md:block shadow-[0_0_15px_rgba(57,255,20,0.5)]" 
          />

          <div className="space-y-32">
            {steps.map((step, idx) => (
              <ProcessStep key={idx} step={step} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProcessStep = ({ step, index }: { step: any, index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`relative flex items-center justify-center md:justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content */}
      <div className={`w-full md:w-[42%] ${isEven ? 'md:text-right' : 'md:text-left'}`}>
        <div className="glass-premium p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all duration-500 group">
          <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
              <step.icon size={24} />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">{step.title}</h3>
          </div>
          <p className="text-gray-400 mb-6 leading-relaxed">{step.description}</p>
          <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
            <Clock size={14} />
            {step.duration}
          </div>
        </div>
      </div>

      {/* Point on Line */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-white/10 z-20 hidden md:block group-hover:scale-125 transition-transform duration-500">
        <motion.div 
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full h-full rounded-full bg-primary shadow-[0_0_10px_#39ff14]" 
        />
      </div>

      {/* Spacer for mobile/desktop alignment */}
      <div className="hidden md:block md:w-[42%]" />
    </motion.div>
  );
};

const Portfolio = () => {
  const projects = [
    {
      title: "Etheria RPG",
      description: "Масштабный RPG мир с 50+ уникальными классами. Онлайн 500+ игроков одновременно.",
      tags: ["MMORPG", "Plugins", "Paper"],
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Hardcore Survival",
      description: "Выживание для хардкорщиков. Температура, жажда, реалистичная физика. Сложность максимум.",
      tags: ["Modding", "Forge", "Survival"],
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "SkyBlock Advanced",
      description: "SkyBlock нового поколения. Автоматизация, кастомные острова, 100+ достижений.",
      tags: ["SkyBlock", "Automation", "Spigot"],
      image: "https://images.unsplash.com/photo-1614728263952-84ea206f99b6?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "PvP Arena Pro",
      description: "Турнирная система с ELO рейтингом. Автоматические матчи, статистика, награды.",
      tags: ["PvP", "System", "Plugin"],
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "BlockEco",
      description: "Полноценная экономика. Банки, биржа, акции, налоги. Как в реальном мире.",
      tags: ["Economy", "Database", "Plugin"],
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Dungeon Master",
      description: "Бесконечные подземелья с процедурной генерацией. 20+ боссов, легендарный лут.",
      tags: ["Generation", "Mod", "Fabric"],
      image: "https://images.unsplash.com/photo-1627389955609-bc015e2a2202?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" ref={ref} className="py-60 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-40"
        >
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-8 px-8 py-2 text-sm rounded-2xl tracking-[0.2em] font-bold uppercase hover:bg-primary/20 transition-all duration-500 cursor-default">Портфолио</Badge>
          <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight uppercase hover:text-primary transition-all duration-700 ease-in-out cursor-default">
            НАШИ <span className="text-gray-800/30">ПРОЕКТЫ</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
            >
              <PerspectiveCard className="h-full">
                <Card className="glass-premium border-white/5 overflow-hidden h-full group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-60 group-hover:opacity-20 transition-opacity" />
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-gray-400 mb-6 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-500 group-hover:text-primary/70 group-hover:border-primary/20 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary hover:text-black font-bold uppercase tracking-widest text-xs py-6 transition-all">
                      ПОДРОБНЕЕ
                    </Button>
                  </CardContent>
                </Card>
              </PerspectiveCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = ({ onOpenOrder }: { onOpenOrder: () => void }) => {
  const plans = [
    {
      name: "Базовый",
      price: "15,000₽",
      features: ["Простые плагины", "До 5 команд", "Базовая настройка", "1 месяц поддержки"],
      popular: false
    },
    {
      name: "Премиум",
      price: "45,000₽",
      features: ["Сложные системы", "Кастомные механики", "Интеграция с API", "3 месяца поддержки"],
      popular: true
    },
    {
      name: "Корпоративный",
      price: "120,000₽",
      features: ["Полный сервер", "Уникальный дизайн", "Безлимитные правки", "6 месяцев поддержки"],
      popular: false
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" ref={ref} className="py-60 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-40 text-right"
        >
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-8 px-8 py-2 text-sm rounded-2xl tracking-[0.2em] font-bold uppercase hover:bg-primary/20 transition-all duration-500 cursor-default">Тарифы</Badge>
          <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight uppercase hover:text-primary transition-all duration-700 ease-in-out cursor-default">
            СТОИМОСТЬ <span className="text-gray-800/30">РАЗРАБОТКИ</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 relative z-10">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
            >
              <PerspectiveCard className="h-full">
                <Card className={`glass-premium border-white/5 overflow-hidden h-full group relative ${plan.popular ? 'border-primary/30 shadow-[0_0_50px_rgba(57,255,20,0.1)]' : ''}`}>
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                  )}
                  <CardContent className="p-12 flex flex-col h-full">
                    {plan.popular && (
                      <Badge className="w-fit bg-primary text-black font-bold mb-6">ПОПУЛЯРНЫЙ</Badge>
                    )}
                    <h3 className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors">{plan.name}</h3>
                    <div className="text-5xl font-black mb-10 text-white tracking-tighter">
                      {plan.price}
                    </div>
                    
                    <ul className="space-y-6 mb-12 flex-grow">
                      {plan.features.map(feature => (
                        <li key={feature} className="flex items-center gap-4 text-gray-400 font-medium">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button 
                      onClick={onOpenOrder}
                      className={`w-full py-8 text-lg font-bold uppercase tracking-widest rounded-2xl transition-all ${plan.popular ? 'bg-primary text-black hover:bg-white shadow-[0_10px_30px_rgba(57,255,20,0.3)]' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}
                    >
                      ВЫБРАТЬ ПЛАН
                    </Button>
                  </CardContent>
                </Card>
              </PerspectiveCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  const members = [
    { name: "ALEX", role: "Lead Developer", skills: ["Java", "Kotlin", "NMS"], color: "from-green-500/20" },
    { name: "MAX", role: "3D Modeler", skills: ["Blockbench", "Forge", "Fabric"], color: "from-blue-500/20" },
    { name: "NICK", role: "Systems Architect", skills: ["Network", "Security", "DB"], color: "from-purple-500/20" }
  ];

  return (
    <section id="team" className="py-60 bg-black/20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-40 text-center"
        >
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-8 px-8 py-2 text-sm rounded-2xl tracking-[0.2em] font-bold uppercase hover:bg-primary/20 transition-all duration-500">Команда</Badge>
          <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight uppercase hover:text-primary transition-all duration-700">
            НАШИ <span className="text-gray-800/30">МАСТЕРА</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 relative z-10">
          {members.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <PerspectiveCard>
                <Card className="glass-premium border-white/5 overflow-hidden group">
                  <div className={`h-2 bg-gradient-to-r ${member.color} to-transparent`} />
                  <CardContent className="p-12 text-center">
                    <div className="w-32 h-32 rounded-full bg-white/5 mx-auto mb-8 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                      <Terminal className="w-12 h-12 text-primary opacity-20 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-3xl font-bold mb-2 tracking-tighter group-hover:text-primary transition-colors">{member.name}</h3>
                    <p className="text-primary/60 font-bold uppercase tracking-widest text-xs mb-8">{member.role}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {member.skills.map(skill => (
                        <Badge key={skill} variant="outline" className="border-white/10 text-gray-500 text-[10px]">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </PerspectiveCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const reviews = [
    {
      name: "Иван Иванов",
      role: "Владелец сервера MegaCraft",
      text: "Сделали плагин экономики за неделю. Онлайн вырос в 3 раза! Очень доволен результатом и скоростью работы.",
      rating: 5,
      avatar: "ИИ"
    },
    {
      name: "Дмитрий Петров",
      role: "Тех. администратор SurvivalWorld",
      text: "Профессионалы своего дела. Код чистый, документация полная. Интеграция прошла без сучка и задоринки.",
      rating: 5,
      avatar: "ДП"
    },
    {
      name: "Артем Сидоров",
      role: "Основатель SkyBlock Pro",
      text: "Лучшая команда разработчиков для Minecraft. Реализовали сложнейшую систему квестов, которую никто не брал.",
      rating: 5,
      avatar: "АС"
    },
    {
      name: "Максим Кузнецов",
      role: "Владелец DungeonCraft",
      text: "Качественная поддержка после релиза. Все мелкие правки вносились мгновенно. Рекомендую всем!",
      rating: 4,
      avatar: "МК"
    },
    {
      name: "Елена Белова",
      role: "Разработчик проекта Mythic",
      text: "Отличное понимание NMS и производительности. Плагины работают стабильно даже при высоком онлайне.",
      rating: 5,
      avatar: "ЕБ"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <section className="py-60 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-40 text-left"
        >
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-8 px-8 py-2 text-sm rounded-2xl tracking-[0.2em] font-bold uppercase hover:bg-primary/20 transition-all duration-500">Отзывы</Badge>
          <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight uppercase hover:text-primary transition-all duration-700">
            ЧТО ГОВОРЯТ <span className="text-gray-800/30">КЛИЕНТЫ</span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto" ref={containerRef}>
          <div className="overflow-hidden">
            <motion.div 
              className="flex"
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {reviews.map((review, idx) => (
                <div key={idx} className="min-w-full px-4">
                  <PerspectiveCard>
                    <Card className="glass-premium border-white/5 p-12 md:p-20 relative overflow-hidden">
                      <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
                        <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center text-primary text-3xl font-black shrink-0 shadow-[0_0_30px_rgba(57,255,20,0.2)]">
                          {review.avatar}
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <div className="flex justify-center md:justify-start gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={20} className={i < review.rating ? "text-primary fill-primary" : "text-gray-700"} />
                            ))}
                          </div>
                          <p className="text-2xl md:text-3xl font-medium text-gray-200 mb-10 leading-relaxed italic">
                            "{review.text}"
                          </p>
                          <div>
                            <h4 className="text-2xl font-bold text-white mb-2">{review.name}</h4>
                            <p className="text-primary/60 font-bold uppercase tracking-widest text-xs">{review.role}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </PerspectiveCard>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${i === activeIndex ? "bg-primary w-12" : "bg-white/10 hover:bg-white/20"}`}
              />
            ))}
          </div>

          <button 
            onClick={() => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-24 text-white/20 hover:text-primary transition-colors hidden lg:block"
          >
            <ChevronRight className="w-12 h-12 rotate-180" />
          </button>
          <button 
            onClick={() => setActiveIndex((prev) => (prev + 1) % reviews.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-24 text-white/20 hover:text-primary transition-colors hidden lg:block"
          >
            <ChevronRight className="w-12 h-12" />
          </button>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "Как долго длится разработка?", a: "От 3 дней до месяца, в зависимости от сложности." },
    { q: "Предоставляете ли вы исходный код?", a: "Да, после полной оплаты вы получаете весь исходный код проекта." },
    { q: "Какие версии Minecraft поддерживаете?", a: "Мы работаем со всеми актуальными версиями от 1.8.8 до 1.21+." }
  ];

  return (
    <section className="py-60 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-8 px-8 py-2 text-sm rounded-2xl tracking-[0.2em] font-bold uppercase">Вопросы</Badge>
            <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight uppercase mb-12">ЧАСТО <br /> <span className="text-gray-800/30">ЗАДАВАЕМЫЕ</span></h2>
            <p className="text-xl text-gray-400 font-medium max-w-md">Ответы на самые популярные вопросы о нашей работе.</p>
          </div>
          <div className="space-y-8">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-premium p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-all"
              >
                <h3 className="text-2xl font-bold mb-4 text-primary">{faq.q}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = ({ onOpenOrder }: { onOpenOrder: () => void }) => {
  return (
    <section className="py-60 container mx-auto px-6 text-center">
      <motion.div 
        whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
        viewport={{ once: true }}
        className="glass-premium p-12 md:p-48 rounded-[40px] md:rounded-[80px] relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-[12rem] font-bold mb-8 md:mb-16 tracking-tightest leading-none uppercase">ГОТОВЫ <br /> <span className="text-primary">НАЧАТЬ?</span></h2>
          <Button 
            onClick={onOpenOrder}
            size="lg" 
            className="w-full md:w-auto bg-primary text-black hover:bg-white font-bold text-2xl md:text-4xl px-10 md:px-20 h-20 md:h-32 rounded-2xl md:rounded-[40px] shadow-[0_30px_100px_rgba(57,255,20,0.5)] transition-all transform hover:-translate-y-4"
          >
            ОБСУДИТЬ ПРОЕКТ
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

const Contact = () => {
  return (
    <section className="py-40 bg-black/40">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Terminal className="text-black w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tighter">BLOCKFORGE</span>
            </div>
            <p className="text-gray-500 max-w-sm mb-12">Ваш надежный партнер в разработке уникальных игровых решений для Minecraft. Создаем будущее вместе.</p>
            <div className="flex gap-4">
              {[Github, Twitter, MessageCircle].map((Icon, i) => (
                <Button key={i} size="icon" variant="outline" className="rounded-xl border-white/10 hover:border-primary/50 hover:text-primary">
                  <Icon size={20} />
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-primary">Разделы</h4>
            <ul className="space-y-4">
              {["Услуги", "Портфолио", "Цены", "Команда"].map(item => (
                <li key={item}><a href="#" className="text-gray-500 hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-primary">Контакты</h4>
            <ul className="space-y-4 text-gray-500">
              <li className="flex items-center gap-3"><MessageCircle size={16} /> @blockforge_dev</li>
              <li className="flex items-center gap-3"><Globe size={16} /> blockforge.studio</li>
              <li className="flex items-center gap-3"><Clock size={16} /> 24/7 Поддержка</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5 bg-black/60">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase">© 2024 BLOCKFORGE STUDIO. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</p>
        <div className="flex gap-12">
          <a href="#" className="text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
