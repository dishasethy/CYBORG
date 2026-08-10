'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import teamImagesData from '../../utils/team_images.json';

export default function TeamCarousel() {
  const images = teamImagesData.image;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const total = images.length;
  
  // Track window resizing for responsive dimensions
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Helper to extract clean cyber labels from Cloudinary URL filenames
  const getLabelFromUrl = (url: string, index: number) => {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    if (filename.includes('CYB_DR_')) {
      const match = filename.match(/CYB_DR_\d+/);
      return match ? match[0].replace(/_/g, ' ') : `ROBOTICS UNIT [0${index + 1}]`;
    }
    if (filename.toLowerCase().includes('whatsapp_image')) {
      return `TEAM MEMORY // SYS_${index * 10 + 104}`;
    }
    return `CYBER RECORD // LAB_${index + 1}`;
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-6 px-4 select-none">
      {/* Decorative Cyber Grid Header */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-8 border-b border-[#494551]/30 pb-3">
        <div className="flex items-center gap-2 font-mono text-[10px] text-[#00F2FF] tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FF] animate-pulse" />
          <span>DATABASE STREAM: TEAM_GALLERY.JSON</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-[#948e9c]">
          <span>INDEX: {activeIndex + 1} / {total}</span>
        </div>
      </div>

      {/* 3D Viewport Wrapper */}
      <div 
        className="relative w-full max-w-5xl h-[340px] md:h-[460px] flex items-center justify-center overflow-visible"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        <AnimatePresence initial={false}>
          {images.map((url, idx) => {
            // Circular offset logic
            let offset = (idx - activeIndex + total) % total;
            if (offset > total / 2) {
              offset -= total;
            }

            const absOffset = Math.abs(offset);
            
            // Render only items in view (offset within +/- 2)
            if (absOffset > 2) return null;

            // Responsive coordinates
            const baseX = isMobile ? 110 : 260;
            const baseZ = isMobile ? -100 : -180;
            const baseY = isMobile ? -15 : -35; // Pinetree vertical lift for background cards
            const baseRotate = isMobile ? 20 : 32;

            let x = 0;
            let y = 0;
            let z = 0;
            let rotateY = 0;
            let scale = 1;
            let opacity = 1;
            const zIndex = 10 - absOffset;

            if (offset === 0) {
              x = 0;
              y = 0;
              z = 0;
              rotateY = 0;
              scale = 1;
              opacity = 1;
            } else if (offset === -1) {
              x = -baseX;
              y = baseY; // Translated upwards
              z = baseZ; // Shifted backwards
              rotateY = baseRotate; // Angled towards center
              scale = 0.86;
              opacity = 0.8;
            } else if (offset === 1) {
              x = baseX;
              y = baseY;
              z = baseZ;
              rotateY = -baseRotate;
              scale = 0.86;
              opacity = 0.8;
            } else if (offset === -2) {
              x = -baseX * 1.75;
              y = baseY * 2; // Scaled higher up
              z = baseZ * 1.85; // Deeper back
              rotateY = baseRotate * 1.5;
              scale = 0.72;
              opacity = 0.45;
            } else if (offset === 2) {
              x = baseX * 1.75;
              y = baseY * 2;
              z = baseZ * 1.85;
              rotateY = -baseRotate * 1.5;
              scale = 0.72;
              opacity = 0.45;
            }

            const isActive = offset === 0;

            return (
              <motion.div
                key={idx}
                style={{
                  position: 'absolute',
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center center',
                }}
                animate={{
                  x,
                  y,
                  z,
                  rotateY,
                  scale,
                  opacity,
                  zIndex,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 24,
                }}
                // Drag gesture only on active card
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -60) handleNext();
                  if (info.offset.x > 60) handlePrev();
                }}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(idx);
                  }
                }}
                className={`relative w-[210px] h-[270px] md:w-[290px] md:h-[380px] rounded-2xl cursor-pointer group select-none transition-all duration-300
                  ${isActive 
                    ? 'shadow-[0_0_25px_rgba(0,242,255,0.25)] border border-[#00F2FF]/40' 
                    : 'shadow-2xl border border-white/5 hover:border-white/10'
                  }
                `}
              >
                {/* Frameless Image Wrapper */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/40">
                  <Image
                    src={url}
                    alt={`Team Image ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                    sizes="(max-width: 768px) 210px, 290px"
                    priority={isActive}
                  />

                  {/* Top Holographic Overlay Line */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#00F2FF]/60 to-transparent pointer-events-none" />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-80" />

                  {/* Scan-line animation inside Active Card */}
                  {isActive && <div className="scan-line" />}

                  {/* Neon Cyber Glow inside Card */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00F2FF]/5 to-[#9a83db]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* HUD Information Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col justify-end pointer-events-none">
                    <div className="flex justify-between items-end">
                      <div className="space-y-0.5">
                        <span className="font-mono text-[9px] text-[#00F2FF]/70 uppercase tracking-wider block">
                          {getLabelFromUrl(url, idx)}
                        </span>
                        <span className="font-cyber font-bold text-[11px] md:text-[13px] text-white tracking-tight block">
                          CYBORG DIRECTIVE
                        </span>
                      </div>
                      <div className="font-mono text-[9px] text-[#948e9c]">
                        0{idx + 1}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glitch Tech border corners on active card */}
                {isActive && (
                  <>
                    <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#00F2FF] pointer-events-none" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#00F2FF] pointer-events-none" />
                    <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#00F2FF] pointer-events-none" />
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#00F2FF] pointer-events-none" />
                  </>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Carousel Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mt-8 w-full max-w-md justify-between font-mono">
        {/* Navigation buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-xl border border-[#494551]/30 text-[#cac4d2] hover:text-[#00F2FF] hover:border-[#00F2FF]/50 transition-all neo-btn cursor-pointer bg-black/20"
            title="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            className="px-4 py-2.5 rounded-xl border border-[#494551]/30 text-[#cac4d2] hover:text-[#00F2FF] hover:border-[#00F2FF]/50 transition-all neo-btn cursor-pointer flex items-center gap-2 bg-black/20 text-xs font-bold"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-[#cac4d2]/30" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-[#cac4d2]/30" />
                <span>PLAY</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            className="p-2.5 rounded-xl border border-[#494551]/30 text-[#cac4d2] hover:text-[#00F2FF] hover:border-[#00F2FF]/50 transition-all neo-btn cursor-pointer bg-black/20"
            title="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Progress indicator pips */}
        <div className="flex items-center gap-1.5 max-w-[200px] overflow-x-auto py-1.5 scrollbar-thin">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex 
                  ? 'w-6 bg-[#00F2FF]' 
                  : 'w-1.5 bg-[#494551]/50 hover:bg-[#00F2FF]/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
