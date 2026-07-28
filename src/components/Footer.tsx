import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Youtube, Twitter, Disc as Discord, Github, Cpu, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  systemUptime: string;
  onNavigate?: (tab: string) => void;
}

export default function Footer({ systemUptime, onNavigate }: FooterProps) {
  // Real live countdown state targeting upcoming RoboCon National Championship 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 109,
    hours: 19,
    minutes: 51,
    seconds: 49,
  });

  useEffect(() => {
    // Target date: November 14, 2026 (Robotics Championship)
    const targetDate = new Date('2026-11-14T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative z-20 w-full bg-[#0b0a11] text-[#cac4d2] py-8 px-6 sm:px-12 md:px-16 border-t border-[#494551]/30 overflow-hidden font-sans">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00F2FF]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* TOP ROW: Branding + Compact Countdown Ticker + Navigation */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-[#494551]/20">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <span className="font-cyber font-black text-2xl text-white tracking-wider">
              CYBORG<span className="text-[#00F2FF]">.</span>
            </span>
            <span className="text-[10px] font-mono text-[#948e9c] uppercase border-l border-[#494551]/40 pl-3">
              ROBOTICS CLUB NITR
            </span>
          </div>

          {/* Compact Countdown Bar */}
          <div className="neo-card px-4 py-2 rounded-2xl border border-[#494551]/40 flex items-center gap-4 text-xs font-mono">
            <span className="text-[10px] font-bold text-[#00F2FF] uppercase tracking-wider hidden sm:inline">
              ⚡ ROBOCON '26:
            </span>
            <div className="flex items-center gap-3 text-white font-bold">
              <span><strong className="text-[#00F2FF]">{String(timeLeft.days).padStart(3, '0')}</strong>d</span>
              <span><strong className="text-[#00F2FF]">{String(timeLeft.hours).padStart(2, '0')}</strong>h</span>
              <span><strong className="text-[#00F2FF]">{String(timeLeft.minutes).padStart(2, '0')}</strong>m</span>
              <span><strong className="text-[#00F2FF]">{String(timeLeft.seconds).padStart(2, '0')}</strong>s</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex items-center gap-5 font-mono text-xs text-[#cac4d2]">
            <button
              onClick={() => onNavigate?.('events')}
              className="hover:text-[#00F2FF] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>EVENTS</span>
              <ArrowUpRight className="w-3 h-3 text-[#00F2FF]" />
            </button>
            <button
              onClick={() => onNavigate?.('projects')}
              className="hover:text-[#00F2FF] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>PROJECTS</span>
              <ArrowUpRight className="w-3 h-3 text-[#00F2FF]" />
            </button>
            <button
              onClick={() => onNavigate?.('team')}
              className="hover:text-[#00F2FF] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>TEAM</span>
              <ArrowUpRight className="w-3 h-3 text-[#00F2FF]" />
            </button>
          </div>
        </div>

        {/* BOTTOM ROW: Social Links, Copyright & System Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#948e9c]">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00F2FF] transition-colors" title="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00F2FF] transition-colors" title="Twitter / X">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00F2FF] transition-colors" title="Discord">
              <Discord className="w-4 h-4" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00F2FF] transition-colors" title="GitHub">
              <Github className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center">
            © 2026 CYBORG ROBOTICS CLUB // SAC NIT ROURKELA
          </div>

          {/* Uptime & Scroll to top */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[10px] bg-[#0f0d13] border border-[#494551]/30 px-2.5 py-1 rounded-lg">
              <Cpu className="w-3 h-3 text-[#00F2FF] animate-pulse" />
              <span>UPTIME: <strong className="text-white">{systemUptime}</strong></span>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-7 h-7 rounded-lg neo-btn border border-[#494551]/40 flex items-center justify-center text-[#00F2FF] hover:border-[#00F2FF]/60 cursor-pointer"
              title="Scroll to Top"
            >
              ↑
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
