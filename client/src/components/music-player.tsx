import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Play, Pause, Volume2, X, Minimize2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export function MusicPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem("music-volume");
    return saved ? parseFloat(saved) : 0.3;
  });
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Auto-play attempt after 1s delay
      if (audioRef.current) {
        audioRef.current.volume = volume;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => {
              console.log("Autoplay blocked by browser");
            });
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      localStorage.setItem("music-volume", volume.toString());
    }
  }, [volume]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/background.mp3"
        loop
        preload="auto"
      />
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -100, x: "-50%", scale: 0 }}
            animate={{ y: 0, x: "-50%", scale: 1 }}
            exit={{ y: -100, x: "-50%", scale: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed top-4 left-1/2 z-[150] cursor-pointer"
            onClick={toggleExpand}
          >
            <motion.div
              layout
              transition={{
                layout: { duration: 0.3, type: "spring", stiffness: 200, damping: 25 }
              }}
              className="bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden flex items-center px-4"
              style={{
                borderRadius: isExpanded ? "24px" : "999px",
                width: isExpanded ? "320px" : "60px",
                height: isExpanded ? "80px" : "32px",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {!isExpanded ? (
                <motion.div 
                  className="w-full flex justify-center items-center"
                  layoutId="icon"
                >
                  <Music 
                    className={`w-4 h-4 text-[#00ff41] ${isPlaying ? "animate-pulse" : ""}`} 
                  />
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full flex flex-col gap-2 py-2"
                >
                  <div className="flex items-center justify-between pointer-events-auto">
                    <div className="flex items-center gap-3 overflow-hidden select-none">
                      <motion.div layoutId="icon">
                        <Music className={`w-5 h-5 text-[#00ff41] ${isPlaying ? "animate-pulse" : ""}`} />
                      </motion.div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-xs font-bold text-white truncate leading-tight">Cybertrack 2077</span>
                        <span className="text-[10px] text-white/50 truncate leading-tight">Background Ambience</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={togglePlay}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-90"
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4 text-[#00ff41] fill-[#00ff41]" />
                        ) : (
                          <Play className="w-4 h-4 text-[#00ff41] fill-[#00ff41]" />
                        )}
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsExpanded(false);
                        }}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-90"
                      >
                        <Minimize2 className="w-4 h-4 text-white/70" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 px-1 pointer-events-auto">
                    <Volume2 className="w-3 h-3 text-white/50" />
                    <Slider
                      value={[volume * 100]}
                      max={100}
                      step={1}
                      onValueChange={(val) => setVolume(val[0] / 100)}
                      onPointerDown={(e) => e.stopPropagation()}
                      className="w-full cursor-pointer [&_[role=slider]]:bg-[#00ff41] [&_[role=slider]]:border-none"
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
