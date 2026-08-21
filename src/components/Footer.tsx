'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Youtube, Github, ArrowUpRight, Calendar } from 'lucide-react';
import { optimizeCloudinaryUrl } from '../utils/cloudinary';

interface FooterProps {
  onNavigate?: (tab: string) => void;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

const CYBORG_BITMAP = [
  "  ###   #   #  ####    ###   ####    #### ",
  " #   #  #   #  #   #  #   #  #   #  #     ",
  " #       # #   #   #  #   #  #   #  #     ",
  " #        #    ####   #   #  ####   #  ###",
  " #        #    #   #  #   #  # #    #    #",
  " #   #    #    #   #  #   #  #  #   #    #",
  "  ###     #    ####    ###   #   #   #### "
];

function GithubTracker() {
  const cols = 53;
  const rows = 7;
  const startCol = 3;

  const getCellColor = (col: number, row: number) => {
    if (col >= startCol && col < startCol + 46) {
      const char = CYBORG_BITMAP[row][col - startCol];
      if (char && char !== ' ') {
        // Deterministic active contribution shades of green
        const val = (col * 3 + row * 7) % 4;
        if (val === 0) return '#0e4429';
        if (val === 1) return '#006d32';
        if (val === 2) return '#26a641';

        return '#39d353';
      }
    }
    return '#161b22';
  };

  return (
    <div className="flex flex-col items-center select-none font-mono text-[11px] text-[#8b949e]">
      {/* Month Labels */}
      <div className="flex w-full pl-9 mb-2 justify-between pr-2" style={{ maxWidth: '890px' }}>
        {MONTHS.map((m, i) => (
          <span key={i} className="w-10 text-center">{m}</span>
        ))}
      </div>

      <div className="flex gap-2.5">
        {/* Day Labels */}
        <div className="flex flex-col justify-between py-1 h-[115px] pr-1.5 text-[10px]">
          {DAYS.map((d, i) => (
            <span key={i} className="h-3.5 leading-[14px]">{d}</span>
          ))}
        </div>

        {/* Contribution Blocks Grid */}
        <div className="grid grid-flow-col gap-[4px] auto-cols-max">
          {[...Array(cols)].map((_, colIdx) => (
            <div key={colIdx} className="grid grid-rows-7 gap-[4px]">
              {[...Array(rows)].map((_, rowIdx) => {
                const color = getCellColor(colIdx, rowIdx);
                return (
                  <div
                    key={rowIdx}
                    className="w-[13px] h-[13px] rounded-[2px] transition-all duration-300 hover:scale-115 hover:shadow-[0_0_10px_rgba(57,211,83,0.7)] cursor-crosshair"
                    style={{ backgroundColor: color }}
                    title={`CYBORG contribution block at [${colIdx}, ${rowIdx}]`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend Footer */}
      <div className="flex justify-end w-full max-w-[890px] gap-1.5 items-center mt-3 text-[10px] pr-2">
        <span>Less</span>
        <div className="w-3 h-3 rounded-[1.5px] bg-[#161b22]" />
        <div className="w-3 h-3 rounded-[1.5px] bg-[#0e4429]" />
        <div className="w-3 h-3 rounded-[1.5px] bg-[#006d32]" />
        <div className="w-3 h-3 rounded-[1.5px] bg-[#9a83db]" />
        <div className="w-3 h-3 rounded-[1.5px] bg-[#39d353]" />
        <span>More</span>
      </div>
    </div>
  );
}

export default function Footer({ onNavigate }: FooterProps) {
  const [scrollLeft, setScrollLeft] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const updateScroll = () => {
      setScrollLeft(el.scrollLeft);
      setMaxScroll(el.scrollWidth - el.clientWidth);
    };

    el.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    const resizeObserver = new ResizeObserver(() => {
      updateScroll();
    });
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener('scroll', updateScroll);
      resizeObserver.disconnect();
    };
  }, []);

  const showLeftFade = scrollLeft > 10;
  const showRightFade = scrollLeft < maxScroll - 10;

  return (
    <footer
      className="relative z-20 w-full text-[#cac4d2] border-t border-[#494551]/30 overflow-hidden font-sans pb-8 pt-4"
      style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(180deg, #1e1c24 0%, #0c0b0f 100%)',
        backgroundSize: '20px 20px, 20px 20px, auto',
      }}
    >
      {/* Red vertical margin line of the main notebook */}
      <div className="absolute left-[38px] top-0 bottom-0 w-[1px] bg-red-500/10 pointer-events-none z-10" />

      {/* Spiral wire rings along the top edge linking pages */}
      <div className="absolute top-0 left-0 right-0 h-4 flex justify-between max-w-7xl mx-auto px-6 sm:px-12 md:px-16 pointer-events-none z-30">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="relative flex flex-col items-center justify-center">
            {/* Punch hole */}
            <div className="w-2 h-2 bg-black rounded-full shadow-inner border border-white/5" />
            {/* Metal ring loop extending upwards over the border */}
            <div className="w-1.5 h-4.5 bg-gradient-to-b from-stone-500 via-stone-200 to-stone-600 rounded-full absolute -top-2.5 shadow-md border-l border-white/20" />
          </div>
        ))}
      </div>

      {/* Grid Pattern overlays for background depth */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] hud-grid" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] tactical-bg" />

      {/* Unified Footer Layout Container */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 flex flex-col items-center justify-center pt-6 pb-4 z-10 relative gap-6">
        {/* Subtle glowing center spot */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,242,255,0.02)_0%,_transparent_75%)] pointer-events-none" />

        {/* Top bar of the gradient band */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] tracking-widest font-mono text-[#948e9c] uppercase z-10 pb-4 border-b border-[#494551]/20">
          <div className="w-full sm:w-1/3 text-center sm:text-left">
            © 2026 CYBORG ROBOTICS CLUB. ALL RIGHTS RESERVED.
          </div>

          <div className="w-full sm:w-1/3 flex justify-center sm:justify-end gap-6 items-center">
            <div className="flex justify-center items-center py-2 sm:py-0 shrink-0">
              <Image
                src={optimizeCloudinaryUrl("https://res.cloudinary.com/dlrhikaak/image/upload/v1786030305/logo_obzdoq.webp", 160)}
                alt="Partner Logo"
                className="h-17 w-auto object-contain brightness-95"
                width={80}
                height={35}
              />
            </div>
            <div className="w-[1px] h-11 bg-[#494531] shrink-0" />
            <div className="flex justify-center items-center py-2 sm:py-0 shrink-0">
              <Image
                src="/cyborg_logo.png"
                alt="Cyborg Logo"
                className="h-17 w-auto object-contain brightness-95"
                width={80}
                height={35}
              />
            </div>
          </div>
        </div>

        {/* GitHub Contribution Tracker Grid Section */}
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center z-10 relative">
          <div className="bg-[#0b0a11]/90 border border-[#2f2b3e]/40 p-6 rounded-xl shadow-inner font-sans w-full relative overflow-hidden">
            {/* Desktop View: Static and Centered */}
            <div className="hidden xl:flex justify-center w-full">
              <div className="min-w-[950px] flex justify-center">
                <GithubTracker />
              </div>
            </div>

            {/* Mobile/Tablet View: Scrollable with Left & Right Gradient Fading Edges */}
            <div className="xl:hidden w-full relative">
              {/* Left Gradient Fade */}
              <div 
                className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0b0a11] via-[#0b0a11]/80 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
                  showLeftFade ? 'opacity-100' : 'opacity-0'
                }`}
              />
              {/* Right Gradient Fade */}
              <div 
                className={`absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0b0a11] via-[#0b0a11]/80 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
                  showRightFade ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Scrollable Container */}
              <div
                ref={scrollContainerRef}
                className="w-full overflow-x-auto scrollbar-none select-none flex scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="min-w-[950px] px-6 py-2 shrink-0">
                  <GithubTracker />
                </div>
              </div>

              {/* Touch Scroll Hint */}
              <div className="flex justify-center items-center gap-2 mt-4 text-[10px] font-mono text-[#8b949e]/60 tracking-wider uppercase animate-pulse select-none">
                <span>← Swipe horizontally to explore contributions →</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation and Social Actions bottom bar - Styled as colorful paper notes pinned to the grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6 z-10 relative">

        {/* Left Side Memo Note: Navigation Links */}
        <div
          className="p-4 pl-8 bg-[#fefcbf] text-[#2d2509] rounded-sm shadow-md transform -rotate-1 relative flex gap-6 font-bold z-10 hover:rotate-0 hover:scale-103 transition-transform duration-300"
          style={{
            backgroundImage: 'linear-gradient(rgba(183, 121, 31, 0.12) 1px, transparent 1px)',
            backgroundSize: '100% 18px',
          }}
        >
          {/* Note margin line */}
          <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-red-500/20" />

          {/* Scotch tape on top of the note */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3.5 bg-white/40 border border-white/10 rotate-1 pointer-events-none shadow-[0_1px_1px_rgba(0,0,0,0.03)]" />

          <button
            onClick={() => onNavigate?.('events')}
            className="hover:text-[#854d0e] transition-colors flex items-center gap-1 font-mono text-[11px] font-black tracking-wider cursor-pointer"
          >
            <span>EVENTS</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#854d0e]" />
          </button>
          <button
            onClick={() => onNavigate?.('projects')}
            className="hover:text-[#854d0e] transition-colors flex items-center gap-1 font-mono text-[11px] font-black tracking-wider cursor-pointer"
          >
            <span>PROJECTS</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#854d0e]" />
          </button>
          <button
            onClick={() => onNavigate?.('team')}
            className="hover:text-[#854d0e] transition-colors flex items-center gap-1 font-mono text-[11px] font-black tracking-wider cursor-pointer"
          >
            <span>TEAM</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#854d0e]" />
          </button>
        </div>

        {/* Right Side Memo Note: Social Media Links & Scroll to top */}
        <div
          className="p-3 pl-8 bg-[#ebf8ff] text-[#1a365d] rounded-sm shadow-md transform rotate-1 relative flex items-center gap-6 font-bold z-10 hover:rotate-0 hover:scale-103 transition-transform duration-300"
          style={{
            backgroundImage: 'linear-gradient(rgba(66, 153, 225, 0.12) 1px, transparent 1px)',
            backgroundSize: '100% 18px',
          }}
        >
          {/* Note margin line */}
          <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-red-500/20" />

          {/* Scotch tape on top of the note */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3.5 bg-white/40 border border-white/10 -rotate-2 pointer-events-none shadow-[0_1px_1px_rgba(0,0,0,0.03)]" />

          <div className="flex items-center gap-4">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#2b6cb0] transition-colors" title="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#2b6cb0] transition-colors flex items-center justify-center" title="X (formerly Twitter)">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#2b6cb0] transition-colors flex items-center justify-center" title="Discord">
              <svg viewBox="0 0 127.14 96.36" className="w-4.5 h-4.5 fill-current">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.4-5c.82-.6,1.62-1.23,2.39-1.88a75.46,75.46,0,0,0,73.1,0c.77.65,1.57,1.28,2.39,1.88a68.43,68.43,0,0,1-10.4,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31.06-18.83C129,54.65,122.84,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#2b6cb0] transition-colors" title="GitHub">
              <Github className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-7 h-7 rounded-sm bg-white/40 flex items-center justify-center text-[#1a365d] hover:bg-white/70 hover:text-blue-700 cursor-pointer shadow-sm border border-white/20"
            title="Scroll to Top"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}