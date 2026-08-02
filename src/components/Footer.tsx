import { motion } from 'motion/react';
import { Youtube, Twitter, Disc as Discord, Github, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate?: (tab: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative z-20 w-full bg-[#0b0a11] text-[#cac4d2] border-t border-[#494551]/30 overflow-hidden font-sans">
      {/* Dynamic Dark Cyberpunk Gradient Band inspired by the website's color theme */}
      <div className="w-full bg-gradient-to-r from-[#0f0d13] via-[#14121a] to-[#0f0d13] py-12 px-6 sm:px-12 md:px-16 border-b border-[#494551]/20 relative overflow-hidden flex flex-col items-center justify-center min-h-[220px]">
        {/* Tactical dot background & subtle glowing center spot */}
        <div className="absolute inset-0 pointer-events-none opacity-20 hud-grid" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,242,255,0.06)_0%,_transparent_75%)] pointer-events-none" />
        
        {/* Top bar of the gradient band */}
        <div className="w-full max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] tracking-widest font-mono text-[#948e9c] uppercase mb-8 z-10">
          <div>
            © 2026 CYBORG ROBOTICS CLUB. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">TERMS // INTEGRITY</span>
            <span className="hover:text-white transition-colors cursor-pointer">PRIVACY // KERNEL</span>
          </div>
        </div>

        {/* Center: Massive futuristic logo */}
        <div className="relative w-full max-w-7xl flex items-center justify-center select-none py-10 z-10 overflow-hidden">
          {/* Huge CYBORG Wordmark with ultra-wide spacing, custom bold font style resembling the TURION logo */}
          <h1 className="font-bitcount font-black text-5xl sm:text-7xl md:text-[8rem] lg:text-[11rem] xl:text-[13rem] 2xl:text-[15rem] tracking-[0.25em] sm:tracking-[0.28em] md:tracking-[0.3em] text-center leading-none uppercase select-none text-transparent bg-clip-text bg-gradient-to-r from-[#9a83db] via-[#00F2FF] to-[#cfbdff] drop-shadow-[0_0_35px_rgba(0,242,255,0.25)] w-full scale-y-135 transform origin-center py-6">
            CYBORG
          </h1>
        </div>
      </div>

      {/* Footer Navigation and Social Actions bottom bar */}
      <div className="max-w-7xl mx-auto py-8 px-6 sm:px-12 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6 z-10 relative">
        {/* Left Side: Navigation Links */}
        <div className="flex items-center gap-6 font-mono text-xs text-[#cac4d2]">
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

        {/* Right Side: Social Media Links & Scroll to top */}
        <div className="flex items-center gap-6 font-mono text-xs text-[#948e9c]">
          <div className="flex items-center gap-4 border-r border-[#494551]/30 pr-6">
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
    </footer>
  );
}
