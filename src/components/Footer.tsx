import { motion } from 'motion/react';
import { Youtube, Github, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate?: (tab: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative z-20 w-full bg-[#0b0a11] text-[#cac4d2] border-t border-[#494551]/30 overflow-hidden font-sans">
      {/* Grid Pattern overlays for the whole footer matching the website's background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.12] hud-grid" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] tactical-bg" />

      {/* Top Section with Branding & Compact Typography */}
      <div className="border-b border-[#494551]/20 relative overflow-hidden flex flex-col items-center justify-center py-4">
        {/* Subtle glowing center spot */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,242,255,0.02)_0%,_transparent_75%)] pointer-events-none" />

        {/* Top bar of the gradient band */}
        <div className="w-full max-w-7xl px-6 sm:px-12 md:px-16 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] tracking-widest font-mono text-[#948e9c] uppercase mb-2 z-10">
          <div>
            © 2026 CYBORG ROBOTICS CLUB. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">TERMS // INTEGRITY</span>
            <span className="hover:text-white transition-colors cursor-pointer">PRIVACY // KERNEL</span>
          </div>
        </div>

        {/* Center: Futuristic logo with slightly increased height and size */}
        <div className="relative w-full max-w-7xl flex items-center justify-center select-none py-1.5 z-10 overflow-hidden px-4">
          <h1 className="font-bitcount font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] 2xl:text-[7.5rem] tracking-[0.25em] sm:tracking-[0.28em] md:tracking-[0.3em] text-center leading-none uppercase select-none text-transparent bg-clip-text bg-gradient-to-r from-[#9a83db] via-[#00F2FF] to-[#cfbdff] drop-shadow-[0_0_10px_rgba(0,242,255,0.1)] w-full scale-y-145 transform origin-center py-1">
            CYBORG
          </h1>
        </div>
      </div>

      {/* Footer Navigation and Social Actions bottom bar */}
      <div className="max-w-7xl mx-auto py-3 px-6 sm:px-12 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4 z-10 relative">
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
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00F2FF] transition-colors flex items-center justify-center" title="X (formerly Twitter)">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00F2FF] transition-colors flex items-center justify-center" title="Discord">
              <svg viewBox="0 0 127.14 96.36" className="w-4.5 h-4.5 fill-current">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.4-5c.82-.6,1.62-1.23,2.39-1.88a75.46,75.46,0,0,0,73.1,0c.77.65,1.57,1.28,2.39,1.88a68.43,68.43,0,0,1-10.4,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31.06-18.83C129,54.65,122.84,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
              </svg>
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