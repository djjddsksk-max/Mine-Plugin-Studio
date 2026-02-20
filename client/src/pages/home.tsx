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
  Rocket,
  User,
  Send,
  Trophy,
  Download,
  Shield,
  Server
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderModal } from "@/components/order-modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChatWidget } from "@/components/chat-widget";

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

const CyberBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      flicker: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 10000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speed: Math.random() * 0.5 + 0.2,
          opacity: Math.random() * 0.5 + 0.2,
          flicker: Math.random() * 0.05
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.y -= p.speed;
        if (p.y < -10) p.y = canvas.height + 10;
        
        p.opacity += (Math.random() - 0.5) * p.flicker;
        if (p.opacity < 0.1) p.opacity = 0.1;
        if (p.opacity > 0.8) p.opacity = 0.8;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(57, 255, 20, ${p.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#39ff14';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
      {/* Perspective Grid */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #39ff14 1px, transparent 1px),
            linear-gradient(to bottom, #39ff14 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black, transparent)',
          transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) scale(2)',
          transformOrigin: 'top'
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
    </div>
  );
};

export default function Home() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [calculatorData, setCalculatorData] = useState<any>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30">
      <CyberBackground />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[200] shadow-[0_0_20px_#39ff14]" style={{ scaleX }} />
      <Navbar onOpenOrder={() => setIsOrderModalOpen(true)} />
      <main>
        <Hero onOpenOrder={() => setIsOrderModalOpen(true)} />
        <Stats />
        <ResultsSection />
        <Achievements />
        <Services />
        <TechSection />
        <WorkProcess />
        <ProcessVisualization />
        <Portfolio />
        <PriceCalculator onOrder={(data) => {
          setCalculatorData(data);
          setIsOrderModalOpen(true);
        }} />
        <Pricing onOpenOrder={() => setIsOrderModalOpen(true)} />
        <Team />
        <Reviews />
        <FAQ />
        <CTA onOpenOrder={() => setIsOrderModalOpen(true)} />
      </main>
      <Footer />
      <ChatWidget />
      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => {
          setIsOrderModalOpen(false);
          setCalculatorData(null);
        }} 
        initialValues={calculatorData}
      />
    </div>
  );
}

const PriceCalculator = ({ onOrder }: { onOrder: (data: any) => void }) => {
  const [type, setType] = useState("plugin");
  const [complexity, setComplexity] = useState("1");
  const [isUrgent, setIsUrgent] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  const basePrices: Record<string, number> = {
    plugin: 10000,
    mod: 15000,
    server: 30000,
    consultation: 5000
  };

  const optionPrices: Record<string, number> = {
    gui: 5000,
    db: 8000,
    api: 10000,
    admin: 12000
  };

  const calculateTotal = () => {
    let total = basePrices[type];
    total *= parseFloat(complexity);
    
    options.forEach(opt => {
      total += optionPrices[opt];
    });

    if (isUrgent) {
      total *= 1.5;
    }

    return Math.round(total);
  };

  const [displayPrice, setDisplayPrice] = useState(calculateTotal());

  useEffect(() => {
    const targetPrice = calculateTotal();
    const duration = 1000;
    const startTime = Date.now();
    const startPrice = displayPrice;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      
      const current = Math.floor(startPrice + (targetPrice - startPrice) * easedProgress);
      setDisplayPrice(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [type, complexity, isUrgent, options]);

  const toggleOption = (opt: string) => {
    setOptions(prev => prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]);
  };

  return (
    <section className="py-40 bg-[#080808] relative overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-6 px-6 py-2 text-sm rounded-xl tracking-widest uppercase">Калькулятор</Badge>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">Рассчитайте стоимость</h2>
            <p className="text-gray-400 text-lg">Выберите параметры вашего идеального проекта</p>
          </div>

          <div className="glass-premium p-8 md:p-12 rounded-[40px] border border-white/5 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="space-y-8">
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500 mb-4 block">Тип проекта</label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="h-14 bg-white/5 border-white/10 rounded-2xl text-lg font-bold focus:ring-primary/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0f0f0f] border-white/10">
                      <SelectItem value="plugin">Плагин (+10к₽)</SelectItem>
                      <SelectItem value="mod">Мод (+15к₽)</SelectItem>
                      <SelectItem value="server">Сервер (+30к₽)</SelectItem>
                      <SelectItem value="consultation">Консультация (+5к₽)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500 mb-4 block">Сложность</label>
                  <Select value={complexity} onValueChange={setComplexity}>
                    <SelectTrigger className="h-14 bg-white/5 border-white/10 rounded-2xl text-lg font-bold focus:ring-primary/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0f0f0f] border-white/10">
                      <SelectItem value="1">Простой (x1.0)</SelectItem>
                      <SelectItem value="1.5">Средний (x1.5)</SelectItem>
                      <SelectItem value="2.5">Сложный (x2.5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-4 p-6 rounded-2xl bg-primary/5 border border-primary/10 cursor-pointer group transition-all hover:bg-primary/10" onClick={() => setIsUrgent(!isUrgent)}>
                  <Checkbox checked={isUrgent} onCheckedChange={() => setIsUrgent(!isUrgent)} />
                  <div className="flex-1">
                    <div className="font-bold text-lg group-hover:text-primary transition-colors">Срочный заказ</div>
                    <div className="text-sm text-gray-400">+50% к стоимости, приоритетная разработка</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500 mb-2 block">Дополнительные опции</label>
                {[
                  { id: "gui", label: "Интерфейс (GUI)", price: "+5к₽" },
                  { id: "db", label: "База данных", price: "+8к₽" },
                  { id: "api", label: "API интеграция", price: "+10к₽" },
                  { id: "admin", label: "Админ панель", price: "+12к₽" }
                ].map((opt) => (
                  <div 
                    key={opt.id}
                    onClick={() => toggleOption(opt.id)}
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer group ${options.includes(opt.id) ? 'bg-primary/10 border-primary/30' : 'bg-white/5 border-white/5 hover:border-white/10'}`}
                  >
                    <div className="flex items-center gap-4">
                      <Checkbox checked={options.includes(opt.id)} />
                      <span className={`font-bold transition-colors ${options.includes(opt.id) ? 'text-primary' : 'text-gray-300'}`}>{opt.label}</span>
                    </div>
                    <span className="text-sm font-mono text-gray-500 group-hover:text-primary transition-colors">{opt.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="text-xs uppercase tracking-[0.3em] font-bold text-gray-500 mb-2">Предварительная стоимость</div>
                <div className="text-6xl md:text-8xl font-black text-primary text-glow-strong tracking-tighter">
                  {displayPrice.toLocaleString()} <span className="text-4xl md:text-6xl">₽</span>
                </div>
              </div>
              
              <Button 
                size="lg"
                onClick={() => onOrder({
                  projectType: type,
                  description: `Рассчитано в калькуляторе:\nСложность: ${complexity}x\nСрочно: ${isUrgent ? 'Да' : 'Нет'}\nОпции: ${options.join(', ')}\nИтоговая цена: ${displayPrice}₽`
                })}
                className="h-24 md:h-32 px-12 md:px-20 bg-primary text-black hover:bg-white rounded-[32px] text-2xl md:text-4xl font-black shadow-[0_20px_60px_rgba(57,255,20,0.4)] hover:-translate-y-2 transition-all active:scale-95 uppercase tracking-tighter group"
              >
                ЗАКАЗАТЬ <ChevronRight className="w-8 h-8 md:w-12 md:h-12 ml-4 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ResultsSection = () => {
  const results = [
    {
      title: "Производительность сервера",
      before: 45,
      after: 98,
      unit: "TPS/FPS",
      description: "Оптимизация ядра и алгоритмов обработки данных",
      data: [
        { name: "1", before: 40, after: 85 },
        { name: "2", before: 35, after: 90 },
        { name: "3", before: 45, after: 95 },
        { name: "4", before: 30, after: 98 },
      ]
    },
    {
      title: "Онлайн игроков",
      before: 120,
      after: 850,
      unit: "Игроков",
      description: "Масштабируемая архитектура и минимизация задержек",
      data: [
        { name: "1", before: 100, after: 300 },
        { name: "2", before: 110, after: 550 },
        { name: "3", before: 125, after: 720 },
        { name: "4", before: 120, after: 850 },
      ]
    },
    {
      title: "Скорость загрузки",
      before: 12,
      after: 1.5,
      unit: "сек",
      description: "Асинхронная подгрузка ресурсов и сжатие пакетов",
      inverse: true,
      data: [
        { name: "1", before: 15, after: 5 },
        { name: "2", before: 13, after: 3 },
        { name: "3", before: 14, after: 2 },
        { name: "4", before: 12, after: 1.5 },
      ]
    }
  ];

  return (
    <section className="py-40 bg-[#050505] relative overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-6 px-6 py-2 text-sm rounded-xl tracking-widest uppercase">Результаты</Badge>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">Доказанная эффективность</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Реальные показатели проектов после внедрения наших решений</p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {results.map((item, idx) => (
            <ResultCard key={idx} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ResultCard = ({ item, index }: { item: any, index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="glass-premium rounded-[32px] border border-white/5 p-8 md:p-12 overflow-hidden relative group"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -mr-32 -mt-32 group-hover:bg-primary/10 transition-colors duration-700" />
      
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tighter">{item.title}</h3>
          <p className="text-gray-400 text-lg mb-8">{item.description}</p>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">До вмешательства</span>
              <div className="flex items-baseline gap-2">
                <Counter value={item.before} isInView={isInView} className="text-4xl md:text-5xl font-black text-red-500" />
                <span className="text-gray-500 font-bold">{item.unit}</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : {}}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-red-500/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">После UnoStudio</span>
              <div className="flex items-baseline gap-2">
                <Counter value={item.after} isInView={isInView} className="text-4xl md:text-5xl font-black text-primary text-glow" />
                <span className="text-primary/70 font-bold">{item.unit}</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : {}}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  className="h-full bg-primary shadow-[0_0_10px_#39ff14]"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className={`px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-tighter ${item.inverse ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
              {item.inverse ? '-' : '+'}{Math.abs(Math.round(((item.after - item.before) / item.before) * 100))}% Эффективности
            </div>
          </div>
        </div>

        <div className="h-[250px] w-full bg-white/5 rounded-3xl p-6 border border-white/10 relative overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={item.data}>
              <defs>
                <linearGradient id={`gradBefore-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id={`gradAfter-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#39ff14" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#39ff14" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ fontWeight: 'bold' }}
              />
              <Area 
                type="monotone" 
                dataKey="before" 
                stroke="#ef4444" 
                strokeWidth={3}
                fillOpacity={1} 
                fill={`url(#gradBefore-${index})`} 
                animationDuration={2000}
              />
              <Area 
                type="monotone" 
                dataKey="after" 
                stroke="#39ff14" 
                strokeWidth={4}
                fillOpacity={1} 
                fill={`url(#gradAfter-${index})`} 
                animationDuration={2500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

const Counter = ({ value, isInView, className }: { value: number, isInView: boolean, className?: string }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
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
  }, [value, isInView]);

  return (
    <span className={className}>
      {Number.isInteger(value) ? Math.floor(count) : count.toFixed(1)}
    </span>
  );
};

const TechSection = () => {
  const techGroups = [
    {
      name: "Server Software",
      items: ["Spigot", "Paper", "Bukkit", "Purpur"]
    },
    {
      name: "Modding Engines",
      items: ["Forge", "Fabric", "NeoForge", "Quilt"]
    },
    {
      name: "Proxies",
      items: ["Velocity", "BungeeCord", "Waterfall"]
    },
    {
      name: "Databases",
      items: ["MySQL", "MongoDB", "Redis", "PostgreSQL"]
    }
  ];

  const allTechs = techGroups.flatMap(group => group.items);

  return (
    <section className="py-40 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-6 px-6 py-2 text-sm rounded-xl tracking-widest uppercase">Стек технологий</Badge>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">Технологии разработки</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {allTechs.map((tech, idx) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              animate={{
                y: [0, -10, 0],
              }}
              className="perspective-1000"
            >
              <motion.div
                transition={{ 
                  y: {
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.2
                  },
                  rotateY: { duration: 0.4 },
                  scale: { duration: 0.4 }
                }}
                animate={{
                  y: [0, -15, 0],
                }}
                whileHover={{ 
                  rotateY: 25, 
                  scale: 1.1,
                  boxShadow: "0 0 30px rgba(57, 255, 20, 0.4)" 
                }}
                className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 h-40 flex flex-col items-center justify-center group cursor-default transition-all duration-500 hover:border-primary/50 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 text-center">
                  <div className="text-primary/40 group-hover:text-primary transition-colors mb-2">
                    <Box className="w-8 h-8 mx-auto" />
                  </div>
                  <span className="text-xl font-bold tracking-tight text-gray-400 group-hover:text-white transition-colors uppercase">{tech}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
          <span className="text-2xl font-bold font-display tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Uno<span className="text-primary">Studio</span></span>
        </motion.div>

        <div className="hidden md:flex items-center gap-6">
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

const CodeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const fontSize = 16;
    const columns = Math.ceil(window.innerWidth / 150); // Fewer columns for better readability
    const codeLines = [
      "public class Plugin extends JavaPlugin",
      "player.sendMessage(\"§aSuccess!\");",
      "@EventHandler",
      "if (player.hasPermission(\"admin\"))",
      "public void onEnable() {",
      "getServer().getPluginManager()",
      "event.setCancelled(true);",
      "ItemStack item = new ItemStack();",
      "getConfig().getString(\"message\");",
      "Bukkit.getScheduler().runTask();"
    ];

    let drops: Array<{
      x: number;
      y: number;
      text: string;
      speed: number;
      opacity: number;
      highlight: boolean;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDrops();
    };

    const initDrops = () => {
      drops = [];
      const columnCount = Math.floor(canvas.width / 250);
      for (let i = 0; i < columnCount; i++) {
        drops.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          text: codeLines[Math.floor(Math.random() * codeLines.length)],
          speed: 0.5 + Math.random() * 1.5,
          opacity: 0.05 + Math.random() * 0.05,
          highlight: Math.random() > 0.8
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `bold ${fontSize}px font-mono, monospace`;

      drops.forEach((drop) => {
        const currentOpacity = drop.highlight ? 0.2 : drop.opacity;
        ctx.fillStyle = `rgba(57, 255, 20, ${currentOpacity})`;
        ctx.fillText(drop.text, drop.x, drop.y);

        drop.y -= drop.speed;

        if (drop.y < -20) {
          drop.y = canvas.height + 20;
          drop.x = Math.random() * canvas.width;
          drop.text = codeLines[Math.floor(Math.random() * codeLines.length)];
          drop.highlight = Math.random() > 0.8;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

const Hero = ({ onOpenOrder }: { onOpenOrder: () => void }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 10]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 perspective-1000">
      <CodeBackground />
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
                className="block text-white hover:text-primary transition-colors duration-700 ease-in-out cursor-default uppercase"
              >
                Uno
              </motion.span>
              <motion.span 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-400 to-secondary text-glow-strong hover:brightness-125 transition-all duration-700 ease-in-out cursor-default uppercase"
              >
                Studio
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
    { label: "Завершенных проектов", value: 150, suffix: "+" },
    { label: "Довольных клиентов", value: 50, suffix: "+" },
    { label: "Uptime серверов", value: 99.9, suffix: "%" },
    { label: "Поддержка", value: "24/7", suffix: "" },
  ];

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div style={{ y }} className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 blur-[120px] rounded-full" />
      </motion.div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all hover:bg-white/[0.07] group"
            >
              <div className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter group-hover:text-primary transition-colors">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs md:text-sm uppercase tracking-widest font-bold text-gray-500 group-hover:text-gray-300 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Achievements = () => {
  const achievements = [
    { label: "Топ-10 на SpigotMC", icon: Trophy },
    { label: "5000+ скачиваний", icon: Download },
    { label: "99.9% Uptime", icon: Shield },
    { label: "50+ серверов", icon: Server },
    { label: "24/7 Поддержка", icon: Clock },
    { label: "5 лет опыта", icon: Star },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex flex-col items-center group cursor-default"
            >
              <motion.div
                whileHover={{ 
                  rotate: 360, 
                  scale: 1.1,
                  filter: "drop-shadow(0 0 15px #39ff14)"
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-32 h-36 relative flex items-center justify-center bg-white/5 border border-primary/20 transition-colors group-hover:border-primary group-hover:bg-primary/5 mb-6"
                style={{
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <item.icon className="w-12 h-12 text-primary relative z-10" />
              </motion.div>
              <span className="text-sm md:text-base font-bold uppercase tracking-widest text-center text-gray-400 group-hover:text-white transition-colors max-w-[150px]">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Разработка плагинов",
      description: "От простых утилит до сложнейших игровых механик на Spigot/Paper API.",
      icon: Zap,
      gradient: "from-primary/20 to-transparent"
    },
    {
      title: "Создание модов",
      description: "Глубокая модификация игры на Forge/Fabric для уникального геймплея.",
      icon: Layers,
      gradient: "from-secondary/20 to-transparent"
    },
    {
      title: "Настройка серверов",
      description: "Оптимизация, защита от DDOS и сборка под ключ для стабильной работы.",
      icon: Cpu,
      gradient: "from-blue-500/20 to-transparent"
    },
    {
      title: "Системы экономики",
      description: "Сложные банковские системы, торговые площадки и интеграция с БД.",
      icon: Globe,
      gradient: "from-purple-500/20 to-transparent"
    }
  ];

  return (
    <section id="services" className="py-40 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-6 px-6 py-2 text-sm rounded-xl tracking-widest uppercase">Наши услуги</Badge>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">Что мы <span className="text-primary">умеем</span></h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Превращаем ваши идеи в стабильный и качественный код.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <PerspectiveCard className="h-full">
                <Card className={`bg-black/40 border-white/5 rounded-3xl h-full overflow-hidden group hover:border-primary/30 transition-all duration-500`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <CardContent className="p-10 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      <service.icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{service.description}</p>
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

  const lineHeight = useSpring(useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="process" ref={ref} className="py-60 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-40">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-8 px-8 py-2 text-sm rounded-2xl tracking-[0.2em] font-bold uppercase cursor-default">Процесс</Badge>
          <motion.h2 
            initial={{ filter: "blur(20px)", opacity: 0 }}
            whileInView={{ filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight uppercase cursor-default"
          >
            КАК МЫ <span className="text-gray-800/30">РАБОТАЕМ</span>
          </motion.h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 hidden md:block" />
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-1/2 top-0 w-px bg-primary -translate-x-1/2 z-10 hidden md:block shadow-[0_0_15px_rgba(57,255,20,0.5)]" 
          />

          <div className="space-y-40">
            {steps.map((step, index) => (
              <ProcessStep key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProcessVisualization = () => {
  const visualizationSteps = [
    {
      title: "Анализ требований",
      percentage: 10,
      icon: Search,
      description: "Глубокое погружение в бизнес-логику"
    },
    {
      title: "Проектирование",
      percentage: 15,
      icon: Layout,
      description: "Архитектура и UX прототипирование"
    },
    {
      title: "Разработка",
      percentage: 50,
      icon: Code,
      description: "Написание чистого и эффективного кода"
    },
    {
      title: "Тестирование",
      percentage: 15,
      icon: ShieldCheck,
      description: "QA аудит и стресс-тестирование"
    },
    {
      title: "Деплой и поддержка",
      percentage: 10,
      icon: Rocket,
      description: "Запуск и техническое сопровождение"
    }
  ];

  return (
    <section className="py-40 bg-[#050505] relative overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-6 px-6 py-2 text-sm rounded-xl tracking-widest uppercase">Таймлайн</Badge>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">Распределение <span className="text-primary">времени</span></h2>
            <p className="text-gray-400 text-lg">Как мы оптимизируем процесс разработки для достижения результата</p>
          </div>

          <div className="space-y-12">
            {visualizationSteps.map((step, idx) => (
              <ProgressBar key={idx} step={step} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProgressBar = ({ step, index }: { step: any, index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = step.percentage;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, step.percentage]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
            <step.icon size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">{step.title}</h3>
            <p className="text-xs text-gray-500 uppercase tracking-wider">{step.description}</p>
          </div>
        </div>
        <div className="text-3xl font-black font-mono text-primary text-glow-small">
          {count}%
        </div>
      </div>
      
      <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${step.percentage}%` } : {}}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
          className="h-full bg-gradient-to-r from-primary/40 via-primary to-primary shadow-[0_0_20px_rgba(57,255,20,0.3)] relative"
        >
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-shimmer opacity-20" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProcessStep = ({ step, index }: { step: any, index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        x: isEven ? -100 : 100,
        filter: "blur(10px)"
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0,
        filter: "blur(0px)"
      } : {}}
      transition={{ 
        duration: 1, 
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2
      }}
      className={`relative flex flex-col md:flex-row items-center gap-12 group ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content Card */}
      <div className={`w-full md:w-[42%] ${isEven ? 'md:text-right' : 'md:text-left'}`}>
        <div className="glass-premium p-10 rounded-[40px] border border-white/5 hover:border-primary/30 transition-all duration-700 group">
          <div className={`flex items-center gap-6 mb-6 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-700 shadow-[0_0_20px_rgba(57,255,20,0.1)] group-hover:shadow-[0_0_30px_rgba(57,255,20,0.4)]">
              <step.icon size={32} />
            </div>
            <h3 className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors duration-500">{step.title}</h3>
          </div>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed font-medium group-hover:text-gray-200 transition-colors duration-500">{step.description}</p>
          <div className={`flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-primary/60 group-hover:text-primary transition-colors duration-500 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
            <Clock size={16} />
            {step.duration}
          </div>
        </div>
      </div>

      {/* Point on Line */}
      <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-background border-2 border-white/10 z-20 hidden md:block group-hover:scale-125 transition-transform duration-700 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
        <motion.div 
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 20 }}
          className="w-full h-full rounded-full bg-primary shadow-[0_0_15px_#39ff14]" 
        />
      </div>

      {/* Spacer / Step Number */}
      <div className={`hidden md:flex md:w-[42%] opacity-5 text-[10rem] font-black italic tracking-tighter pointer-events-none select-none ${isEven ? 'justify-start' : 'justify-end'}`}>
        0{index + 1}
      </div>
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
            >
              <PerspectiveCard className="h-full">
                <motion.div
                  whileHover={{ 
                    scale: 1.03,
                    rotateY: 5,
                    rotateX: -5,
                    boxShadow: "0 0 40px rgba(57, 255, 20, 0.2)"
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Card className="glass-premium border-white/5 overflow-hidden h-full group">
                    <div className="relative h-48 overflow-hidden">
                      <motion.img 
                        src={project.image} 
                        alt={project.title} 
                        whileHover={{ scale: 1.15, rotate: 2 }}
                        transition={{ duration: 0.7 }}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0"
                      />
                      <motion.div 
                        initial={{ opacity: 0.6 }}
                        whileHover={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 transition-opacity" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="bg-primary/90 text-black p-4 rounded-full scale-50 group-hover:scale-100 transition-transform duration-500">
                          <Search size={24} />
                        </div>
                      </div>
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
                      <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary hover:text-black font-bold uppercase tracking-widest text-xs py-6 transition-all relative overflow-hidden">
                        ПОДРОБНЕЕ
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
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
    { name: "ALEX", role: "Главный разработчик", skills: ["Java", "Kotlin", "NMS"], color: "from-green-500/20" },
    { name: "MAX", role: "3D художник", skills: ["Blockbench", "Forge", "Fabric"], color: "from-blue-500/20" },
    { name: "NICK", role: "Системный архитектор", skills: ["Network", "Security", "DB"], color: "from-purple-500/20" }
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
    { q: "Сколько времени занимает разработка?", a: "Простые плагины - 3-7 дней. Сложные системы - 2-4 недели. Полный сервер - 1-3 месяца." },
    { q: "Получу ли я исходный код?", a: "Да! После оплаты вы получаете весь исходный код, документацию и права на использование." },
    { q: "Какие версии Minecraft поддерживаете?", a: "Работаем со всеми версиями от 1.8.8 до последних снапшотов 1.21+. Оптимизируем под вашу аудиторию." }
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
    <section className="py-60 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-premium p-20 md:p-40 rounded-[60px] border border-primary/20 text-center relative overflow-hidden group shadow-[0_0_100px_rgba(57,255,20,0.1)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter uppercase leading-[0.9]">
              ГОТОВЫ ЗАПУСТИТЬ <br /> <span className="text-primary text-glow-strong">СВОЙ СЕРВЕР?</span>
            </h2>
            <p className="text-xl md:text-3xl text-gray-400 mb-20 max-w-3xl mx-auto font-medium">
              Не откладывайте на завтра то, что может приносить доход уже сегодня.
            </p>
            <Button 
              onClick={onOpenOrder}
              size="lg"
              className="h-24 md:h-32 px-12 md:px-24 bg-primary text-black hover:bg-white rounded-3xl text-2xl md:text-4xl font-black shadow-[0_20px_60px_rgba(57,255,20,0.4)] hover:-translate-y-2 transition-all uppercase"
            >
              СВЯЗАТЬСЯ С НАМИ <MessageSquare className="w-8 h-8 md:w-12 md:h-12 ml-6" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-black/40 backdrop-blur-3xl">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_20px_#39ff14]">
                <Terminal className="text-black w-7 h-7" />
              </div>
              <span className="text-3xl font-black tracking-tighter">Uno<span className="text-primary">Studio</span></span>
            </div>
            <p className="text-gray-500 text-lg max-w-md leading-relaxed font-medium">
              Лидеры в области разработки игровых решений для Minecraft. Мы создаем будущее игры уже сегодня.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Навигация</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><a href="#services" className="hover:text-primary transition-colors">Услуги</a></li>
              <li><a href="#portfolio" className="hover:text-primary transition-colors">Портфолио</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Цены</a></li>
              <li><a href="#team" className="hover:text-primary transition-colors">Команда</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Контакты</h4>
            <div className="flex gap-4">
              <motion.a whileHover={{ y: -5, color: "#39ff14" }} href="#" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary/10 transition-all border border-white/5">
                <Github size={24} />
              </motion.a>
              <motion.a whileHover={{ y: -5, color: "#39ff14" }} href="#" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary/10 transition-all border border-white/5">
                <Twitter size={24} />
              </motion.a>
              <motion.a whileHover={{ y: -5, color: "#39ff14" }} href="#" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary/10 transition-all border border-white/5">
                <MessageCircle size={24} />
              </motion.a>
            </div>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 text-center text-gray-600 font-bold uppercase tracking-widest text-xs">
          © 2024 Uno Studio. Все права защищены. Разработано с страстью к Minecraft.
        </div>
      </div>
    </footer>
  );
};
