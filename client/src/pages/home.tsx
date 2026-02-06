import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Terminal,
  Menu,
  X,
  LucideIcon,
  Sparkles,
  Command,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Zap,
  Layout
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-4" : "bg-transparent py-8"}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center transform rotate-3 shadow-[0_0_20px_rgba(57,255,20,0.4)] group-hover:rotate-0 transition-all duration-300">
              <Terminal className="text-black w-7 h-7" />
            </div>
          </div>
          <span className="text-2xl font-bold font-display tracking-tight">BLOCK<span className="text-primary">FORGE</span></span>
        </motion.div>

        <div className="hidden md:flex items-center gap-10">
          {["Услуги", "Портфолио", "Команда"].map((item, idx) => (
            <motion.a 
              key={item}
              href={`#${item}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="text-sm font-semibold hover:text-primary transition-all relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </motion.a>
          ))}
          <Button className="bg-primary text-black hover:bg-white font-bold px-8 h-12 rounded-xl transition-all shadow-lg hover:shadow-primary/20 active:scale-95">
            Оставить заявку
          </Button>
        </div>

        <button className="md:hidden text-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-4 right-4 bg-black/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col gap-6 shadow-2xl"
          >
             {["Услуги", "Портфолио", "Команда"].map(item => (
               <a key={item} href="#" className="text-2xl font-bold text-center" onClick={() => setMobileMenuOpen(false)}>{item}</a>
             ))}
             <Button className="w-full bg-primary text-black font-bold text-xl py-8 rounded-2xl">Начать проект</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="scanline" />
      
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background z-10" />
        <img 
          src="/images/hero-bg.png" 
          alt="Workshop" 
          className="w-full h-full object-cover brightness-[0.4]"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 mb-10 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">High-End Minecraft Development</span>
            </div>
            
            <h1 className="text-6xl md:text-[10rem] font-bold font-display mb-10 leading-[0.9] tracking-tighter">
              СТРОИМ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-400 to-secondary text-glow">БУДУЩЕЕ</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
              Премиальная разработка плагинов и модов для тех, кто ценит стабильность, производительность и уникальный игровой опыт.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button size="xl" className="bg-primary text-black hover:bg-white font-bold text-2xl px-14 h-20 rounded-2xl shadow-2xl hover:shadow-primary/40 transition-all active:scale-95">
                ЗАКАЗАТЬ ПРОЕКТ
              </Button>
              <Button size="xl" variant="outline" className="border-white/10 hover:bg-white/5 font-bold text-2xl px-14 h-20 rounded-2xl backdrop-blur-sm">
                ПОРТФОЛИО
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40"
      >
        <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </div>
  );
};

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    className="group"
  >
    <Card className="bg-white/[0.03] border-white/5 hover:border-primary/50 transition-all duration-500 rounded-[32px] h-full overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardContent className="p-10">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
          <Icon className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-gray-400 text-lg leading-relaxed font-medium">
          {description}
        </p>
      </CardContent>
    </Card>
  </motion.div>
);

const Services = () => {
  return (
    <section id="services" className="py-40 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-6 px-4 py-1 text-sm rounded-full">НАШИ ВОЗМОЖНОСТИ</Badge>
          <h2 className="text-5xl md:text-8xl font-bold leading-tight tracking-tighter">
            СОЗДАЕМ ТО, ЧТО <br /> <span className="text-gray-600">ДРУГИЕ НЕ МОГУТ</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Zap}
            title="CORE ENGINE"
            description="Оптимизированные ядра и плагины. Работаем с высоконагруженными системами и сложной логикой."
            delay={0.1}
          />
          <FeatureCard 
            icon={Layout}
            title="UI/UX MODS"
            description="Разработка уникальных интерфейсов и игровых механик. Полное погружение в атмосферу."
            delay={0.2}
          />
          <FeatureCard 
            icon={ShieldCheck}
            title="SECURITY"
            description="Защита вашего проекта от взломов, читов и атак. Спокойствие для вас и игроков."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 bg-black border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-8">
              <Terminal className="text-primary w-10 h-10" />
              <span className="text-3xl font-bold font-display">BLOCKFORGE</span>
            </div>
            <p className="text-gray-400 text-lg font-medium">
              Ваш надежный партнер в мире Майнкрафт-разработки. Качество, проверенное временем.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-primary font-bold mb-6 uppercase tracking-widest text-xs">Разработка</h4>
              <div className="flex flex-col gap-4 text-gray-500 font-medium">
                <a href="#" className="hover:text-white transition-colors">Плагины</a>
                <a href="#" className="hover:text-white transition-colors">Моды</a>
                <a href="#" className="hover:text-white transition-colors">Сборки</a>
              </div>
            </div>
            <div>
              <h4 className="text-primary font-bold mb-6 uppercase tracking-widest text-xs">Студия</h4>
              <div className="flex flex-col gap-4 text-gray-500 font-medium">
                <a href="#" className="hover:text-white transition-colors">Портфолио</a>
                <a href="#" className="hover:text-white transition-colors">Отзывы</a>
                <a href="#" className="hover:text-white transition-colors">Контакты</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
          <div className="text-gray-600 font-bold uppercase tracking-widest text-[10px]">
            © 2026 BlockForge Studio // Crafted for Champions
          </div>
          <div className="flex gap-8">
             <Github className="w-6 h-6 text-gray-600 hover:text-white transition-colors cursor-pointer" />
             <Twitter className="w-6 h-6 text-gray-600 hover:text-white transition-colors cursor-pointer" />
             <MessageSquare className="w-6 h-6 text-gray-600 hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left shadow-[0_0_10px_rgba(57,255,20,0.5)]"
        style={{ scaleX }}
      />
      
      <Navbar />
      <main>
        <Hero />
        <Services />
        
        <section className="py-40 container mx-auto px-6">
          <div className="relative p-12 md:p-32 rounded-[64px] bg-gradient-to-br from-primary/20 to-secondary/10 border border-white/5 overflow-hidden group text-center">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-5xl md:text-9xl font-bold mb-10 tracking-tighter">ХВАТИТ ЖДАТЬ. <br /> <span className="text-primary">ДАВАЙТЕ СТРОИТЬ.</span></h2>
              <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-2xl mx-auto font-medium">Мы берем на себя всю техническую часть, чтобы вы могли сосредоточиться на игре.</p>
              <Button size="xl" className="bg-primary text-black hover:bg-white font-bold text-3xl px-16 h-28 rounded-3xl shadow-2xl transition-all active:scale-95">
                ОБСУДИТЬ ПРОЕКТ
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
