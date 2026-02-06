import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
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
  LucideIcon
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transform rotate-3 shadow-[0_0_15px_rgba(57,255,20,0.5)]">
            <Terminal className="text-black w-6 h-6" />
          </div>
          <span className="text-2xl font-bold font-display tracking-wider">BLOCK<span className="text-primary">FORGE</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">Услуги</a>
          <a href="#portfolio" className="text-sm font-medium hover:text-primary transition-colors">Портфолио</a>
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">О студии</a>
          <Button className="bg-primary text-black hover:bg-primary/90 font-bold border-0 shadow-[0_0_20px_rgba(57,255,20,0.3)]">
            Заказать <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4">
           <a href="#services" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Услуги</a>
           <a href="#portfolio" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Портфолио</a>
           <Button className="w-full bg-primary text-black">Заказать</Button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10" />
        <img 
          src="/images/hero-bg.png" 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-60"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="bg-secondary/20 text-secondary border-secondary/50 mb-6 hover:bg-secondary/30 transition-colors px-4 py-1 text-sm rounded-full backdrop-blur-sm">
            🚀 Профессиональная разработка для Minecraft
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 leading-tight">
            Создаем <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300 text-glow">Магию</span><br />
            в Вашем Мире
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            От кастомных плагинов до сложных модов. Мы превращаем ваши идеи в идеальный код, который работает стабильно и выглядит потрясающе.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary text-black hover:bg-primary/90 font-bold text-lg px-8 h-14 rounded-xl shadow-[0_0_30px_rgba(57,255,20,0.4)] hover:shadow-[0_0_50px_rgba(57,255,20,0.6)] transition-all duration-300 transform hover:-translate-y-1">
              Начать проект
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/5 text-lg px-8 h-14 rounded-xl backdrop-blur-sm">
              Наше портфолио
            </Button>
          </div>
        </motion.div>

        {/* Floating Code Snippets Decoration */}
        <motion.div 
          className="absolute -left-10 top-1/4 hidden lg:block"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="bg-black/60 backdrop-blur-md p-4 rounded-lg border border-white/10 font-mono text-xs text-left shadow-2xl">
            <div className="flex gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <p className="text-purple-400">@EventHandler</p>
            <p className="text-blue-400">public void <span className="text-yellow-300">onJoin</span>(PlayerJoinEvent e) {"{"}</p>
            <p className="pl-4 text-gray-300">Player p = e.getPlayer();</p>
            <p className="pl-4 text-gray-300">p.sendMessage(<span className="text-green-400">"Welcome!"</span>);</p>
            <p className="text-blue-400">{"}"}</p>
          </div>
        </motion.div>

         <motion.div 
          className="absolute -right-10 bottom-1/4 hidden lg:block"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="bg-black/60 backdrop-blur-md p-4 rounded-lg border border-white/10 font-mono text-xs text-left shadow-2xl">
            <div className="flex gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <p className="text-gray-400">// Config.yml</p>
            <p className="text-blue-400">settings:</p>
            <p className="pl-4 text-gray-300">enabled: <span className="text-primary">true</span></p>
            <p className="pl-4 text-gray-300">mode: <span className="text-green-400">"HARDCORE"</span></p>
            <p className="pl-4 text-gray-300">max-players: <span className="text-purple-400">1000</span></p>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
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
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
  >
    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 group overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardContent className="p-8 relative z-10">
        <div className="w-14 h-14 bg-black/50 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all">
          <Icon className="w-7 h-7 text-white group-hover:text-primary transition-colors" />
        </div>
        <h3 className="text-xl font-bold font-display mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  </motion.div>
);

const Services = () => {
  return (
    <section id="services" className="py-32 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">Наши <span className="text-primary">Услуги</span></h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Мы предлагаем полный цикл разработки для вашего сервера, от идеи до релиза.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Code2}
            title="Плагины (Spigot/Paper)"
            description="Оптимизированные плагины любой сложности. Мини-игры, системы экономики, защиты и управления чатом."
            delay={0.1}
          />
          <FeatureCard 
            icon={Box}
            title="Моды (Fabric/Forge)"
            description="Добавление новых блоков, предметов, механик и измерений. Полная интеграция с клиентом и сервером."
            delay={0.2}
          />
          <FeatureCard 
            icon={Cpu}
            title="Оптимизация"
            description="Аудит производительности вашего сервера. Устранение лагов, настройка конфигураций и JVM флагов."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  return (
    <section className="py-20 border-y border-white/10 bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { number: "500+", label: "Плагинов" },
            { number: "50+", label: "Серверов" },
            { number: "3", label: "Года Опыта" },
            { number: "24/7", label: "Поддержка" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2">
                {stat.number}
              </div>
              <div className="text-primary font-mono text-sm uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-black border-t border-white/10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Terminal className="text-primary w-6 h-6" />
          <span className="text-xl font-bold font-display">BLOCK<span className="text-primary">FORGE</span></span>
        </div>
        
        <div className="text-gray-500 text-sm">
          © 2024 BlockForge Studio. Все права защищены.
        </div>

        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-all">
            <MessageSquare className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all">
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <Hero />
      <Services />
      <Stats />
      
      {/* CTA Section */}
      <section className="py-32 container mx-auto px-6 text-center relative overflow-hidden rounded-3xl my-20 border border-white/10 bg-gradient-to-br from-gray-900 to-black">
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold font-display mb-8">Готовы обновить свой сервер?</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Свяжитесь с нами сегодня, и мы обсудим ваш проект. Консультация бесплатна!
          </p>
          <Button size="lg" className="bg-primary text-black hover:bg-primary/90 font-bold text-lg px-12 h-16 rounded-xl shadow-[0_0_40px_rgba(57,255,20,0.4)] hover:shadow-[0_0_60px_rgba(57,255,20,0.6)] transition-all">
            Связаться с нами
          </Button>
        </div>
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </section>

      <Footer />
    </div>
  );
}
