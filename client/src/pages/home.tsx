import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Box, 
  Cpu, 
  Zap, 
  MessageSquare, 
  Github, 
  Twitter, 
  ChevronRight, 
  Terminal,
  Menu,
  X,
  LucideIcon,
  Sparkles,
  Command,
  ShieldCheck
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/10 py-3" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transform rotate-3 shadow-[0_0_15px_rgba(57,255,20,0.5)] group-hover:rotate-12 transition-transform duration-300">
              <Terminal className="text-black w-6 h-6" />
            </div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-black"
            />
          </div>
          <span className="text-2xl font-bold font-minecraft tracking-widest group-hover:text-primary transition-colors">BLOCK<span className="text-primary">FORGE</span></span>
        </motion.div>

        <div className="hidden md:flex items-center gap-10">
          {["Услуги", "Портфолио", "О студии"].map((item, idx) => (
            <motion.a 
              key={item}
              href={`#${item}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="text-xs uppercase font-minecraft tracking-[0.2em] hover:text-primary transition-all relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </motion.a>
          ))}
          <Button className="bg-primary text-black hover:bg-white font-minecraft tracking-tighter border-0 shadow-[4px_4px_0px_#1a3a0e] active:translate-y-1 active:shadow-none transition-all px-6">
            СТАРТ <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <button className="md:hidden text-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-6"
          >
             {["Услуги", "Портфолио", "Команда"].map(item => (
               <a key={item} href="#" className="text-xl font-minecraft tracking-widest text-center" onClick={() => setMobileMenuOpen(false)}>{item}</a>
             ))}
             <Button className="w-full bg-primary text-black font-minecraft text-xl py-6">Связаться</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 300]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.1]);

  return (
    <div className="relative min-h-[110vh] flex items-center justify-center overflow-hidden">
      <div className="scanline" />
      
      <motion.div style={{ y, opacity, scale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background z-10" />
        <img 
          src="/images/hero-bg.png" 
          alt="Workshop" 
          className="w-full h-full object-cover grayscale-[0.3] brightness-[0.4]"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-[10px] uppercase font-minecraft tracking-[0.3em] text-primary">Deploying code to block-space</span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-bold font-display mb-8 leading-none tracking-tighter">
              BEYOND THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-400 to-secondary animate-gradient-x text-glow">BLOCKS</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light font-sans italic opacity-80">
              Архитектура игровых миров: от высоконагруженных систем до визуальных шедевров.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Button size="xl" className="bg-primary text-black hover:bg-white font-minecraft text-2xl px-12 h-20 rounded-none shadow-[6px_6px_0px_#1a3a0e] hover:shadow-[10px_10px_0px_#1a3a0e] transition-all transform hover:-translate-x-1 hover:-translate-y-1">
                BUILD NOW
              </Button>
              <Button size="xl" variant="outline" className="border-white/20 hover:bg-white/5 font-minecraft text-2xl px-12 h-20 rounded-none">
                BROWSE FILES
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Code Matrix effect decoration */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden xl:block opacity-30 pointer-events-none">
          <motion.div 
            animate={{ opacity: [0.2, 0.5, 0.2] }} 
            transition={{ duration: 4, repeat: Infinity }}
            className="font-mono text-[10px] space-y-1 text-primary"
          >
            {Array.from({length: 12}).map((_, i) => (
              <div key={i}>{Math.random().toString(16).substring(2, 20)}</div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
      >
        <span className="text-[10px] font-minecraft uppercase tracking-widest">Scroll to explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
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
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="group"
  >
    <div className="relative p-1 overflow-hidden rounded-2xl bg-white/5 hover:bg-primary/20 transition-all duration-500 h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Card className="bg-black border-0 rounded-xl h-full relative z-10 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
        <CardContent className="p-8">
          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-minecraft tracking-wider mb-4 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
            {description}
          </p>
          <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-minecraft text-primary tracking-widest">LATEST ENGINE</span>
            <ChevronRight className="w-4 h-4 text-primary" />
          </div>
        </CardContent>
      </Card>
    </div>
  </motion.div>
);

const Services = () => {
  return (
    <section id="services" className="py-40 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="text-primary font-minecraft tracking-[0.4em] mb-4 text-xs uppercase"
            >
              System capabilities
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-bold font-display leading-tight">
              ИНЖЕНЕРИЯ <br /> <span className="text-gray-600">НОВОГО УРОВНЯ</span>
            </h2>
          </div>
          <div className="md:text-right">
            <p className="text-gray-500 max-w-xs font-light text-sm italic">
              "Мы не просто пишем код, мы строим экосистемы, в которых хочется жить."
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 xl:gap-12">
          <FeatureCard 
            icon={Terminal}
            title="CORE PLUGINS"
            description="Отказоустойчивые решения для Spigot/Paper. Архитектура, готовая к нагрузкам в 1000+ игроков без потерь TPS."
            delay={0.1}
          />
          <FeatureCard 
            icon={Command}
            title="CUSTOM MODS"
            description="Глубокое изменение игровых механик на Fabric. Собственные рендеры, шейдеры и комплексные GUI-интерфейсы."
            delay={0.2}
          />
          <FeatureCard 
            icon={ShieldCheck}
            title="SYS-SECURITY"
            description="Комплексная защита от эксплоитов, DDoS-атак прикладного уровня и кастомный анти-чит на основе эвристики."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="portfolio" className="py-40 bg-black relative">
       <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-minecraft tracking-[0.2em] mb-4">TERMINAL_LOGS.EXE</h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
             {[1, 2].map(i => (
               <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="relative group cursor-pointer overflow-hidden rounded-3xl"
               >
                 <div className="aspect-video bg-gray-900 overflow-hidden relative">
                    <img 
                      src={`https://images.unsplash.com/photo-${i === 1 ? '1605379399642-870262d3d051' : '1550745165-9bc0b252726f'}?auto=format&fit=crop&q=80&w=2000`} 
                      className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                 </div>
                 <div className="absolute bottom-0 left-0 p-8">
                    <Badge className="bg-primary text-black font-minecraft mb-4">PROJECT_0{i}</Badge>
                    <h3 className="text-3xl font-minecraft tracking-widest mb-2">NEON_NETWORK</h3>
                    <p className="text-gray-400 text-sm font-light">Custom MMORPG engine integration</p>
                 </div>
               </motion.div>
             ))}
          </div>
       </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="py-20 bg-background border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <Terminal className="text-primary w-8 h-8" />
              <span className="text-3xl font-minecraft tracking-widest">BLOCKFORGE</span>
            </div>
            <p className="text-gray-500 max-w-sm font-light text-sm leading-relaxed italic">
              Превращаем виртуальную пыль в цифровую сталь. Код, который не ломается. Дизайн, который не забывается.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase font-minecraft tracking-widest text-primary mb-6">Connect</h4>
            <div className="flex flex-col gap-4 text-sm text-gray-500 font-light">
              <a href="#" className="hover:text-primary transition-colors">Discord Community</a>
              <a href="#" className="hover:text-primary transition-colors">GitHub Repos</a>
              <a href="#" className="hover:text-primary transition-colors">Telegram Support</a>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase font-minecraft tracking-widest text-primary mb-6">Office</h4>
            <div className="text-sm text-gray-500 font-light">
              Remote, Planet Earth<br />
              GMT +3 / 24/7 Operations
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
          <div className="text-[10px] font-minecraft text-gray-700 tracking-widest uppercase">
            Built with extreme precision // © 2026 BlockForge
          </div>
          <div className="flex gap-8 text-[10px] font-minecraft text-gray-700 tracking-widest uppercase">
            <a href="#">Security Policy</a>
            <a href="#">Terms of service</a>
          </div>
        </div>

        {/* Massive background text */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 select-none pointer-events-none opacity-[0.02] whitespace-nowrap text-[25vw] font-bold font-display leading-none">
          FORGE
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
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        
        {/* Advanced CTA */}
        <section className="py-40 container mx-auto px-6 relative">
          <div className="relative z-10 p-12 md:p-24 rounded-[40px] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-3xl overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/30 transition-colors" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <Badge className="bg-primary/10 text-primary border-primary/20 font-minecraft mb-8 px-6 py-2 tracking-[0.3em]">INITIATE_CONNECTION</Badge>
              <h2 className="text-5xl md:text-8xl font-bold font-display mb-10 tracking-tighter">
                ДАВАЙТЕ СТРОИТЬ <br /> <span className="text-primary">ВМЕСТЕ</span>
              </h2>
              <p className="text-xl text-gray-500 mb-12 max-w-xl font-light italic">
                Отправьте свой запрос в наш терминал, и мы свяжемся с вами в течение 12 часов.
              </p>
              <Button size="xl" className="bg-primary text-black hover:bg-white font-minecraft text-3xl px-16 h-24 rounded-none shadow-[10px_10px_0px_#1a3a0e] transition-all">
                GET_STARTED.SH
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
