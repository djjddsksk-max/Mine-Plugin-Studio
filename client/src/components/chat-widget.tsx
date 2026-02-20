import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const quickButtons = [
    { label: "Заказать плагин", value: "Хочу заказать разработку плагина" },
    { label: "Узнать цену", value: "Сколько будет стоить мой проект?" },
    { label: "Техподдержка", value: "Нужна помощь с текущим проектом" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Chat submitted:", { name, message });
    setName("");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-8 right-8 z-[150] flex flex-col items-end gap-4">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
                className="w-[320px] h-[400px] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(57,255,20,0.1)] flex flex-col overflow-hidden"
              >
                {/* Header */}
                <div className="p-5 border-b border-white/5 flex items-center justify-between bg-primary/5">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <User size={16} />
                      </div>
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary rounded-full border-2 border-[#0a0a0a] shadow-[0_0_10px_#39ff14]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs">Uno Support</h4>
                      <p className="text-[9px] text-primary uppercase tracking-widest font-bold">Онлайн</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  <div className="bg-white/5 rounded-2xl p-3 text-xs text-gray-300 border border-white/5">
                    Привет! 👋 Чем мы можем вам помочь сегодня? Выберите быстрый ответ или напишите свой вопрос.
                  </div>

                  <div className="flex flex-col gap-1.5">
                    {quickButtons.map((btn) => (
                      <button
                        key={btn.label}
                        onClick={() => setMessage(btn.value)}
                        className="text-left px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10 text-[10px] font-medium hover:bg-primary/10 hover:border-primary/30 transition-all text-gray-300 hover:text-primary"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-2.5 pt-2">
                    <Input 
                      placeholder="Ваше имя" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/5 border-white/10 rounded-xl h-9 text-xs focus:ring-primary/30"
                      required
                    />
                    <textarea 
                      placeholder="Сообщение..." 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-primary/30 focus:outline-none min-h-[60px] resize-none"
                      required
                    />
                    <Button 
                      type="submit"
                      className="w-full bg-primary text-black hover:bg-white font-bold rounded-xl h-10 shadow-[0_10px_20px_rgba(57,255,20,0.2)] text-xs"
                    >
                      ОТПРАВИТЬ <Send size={14} className="ml-2" />
                    </Button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="w-16 h-16 bg-black border border-primary/30 rounded-full flex items-center justify-center text-primary shadow-[0_0_30px_rgba(57,255,20,0.3)] hover:shadow-[0_0_40px_rgba(57,255,20,0.5)] transition-all duration-300 relative group"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                >
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                >
                  <MessageCircle size={28} className="group-hover:animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>
            {!isOpen && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-black animate-bounce" />
            )}
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
