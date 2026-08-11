'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import teamImagesData from '../../utils/team_images.json';

export default function TeamCarousel() {
  const images = teamImagesData.image;
  const [activeIndex, setActiveIndex] = useState(0);
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

  // Auto-play interval - loops through images automatically
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none overflow-hidden pt-6 pb-4">
      {/* Pinterest-style Story Progress Bar Indicator */}
      <div className="absolute top-0 inset-x-8 z-30 flex gap-1.5 justify-center max-w-xl mx-auto px-4 pointer-events-none">
        {images.map((_, idx) => (
          <div key={idx} className="h-1 flex-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-[#cfbdff]/70"
              initial={{ width: "0%" }}
              animate={{ width: idx === activeIndex ? "100%" : (idx < activeIndex ? "100%" : "0%") }}
              transition={{ duration: idx === activeIndex ? 4.5 : 0.3, ease: "linear" }}
            />
          </div>
        ))}
      </div>

      {/* 3D Viewport Wrapper with Panning/Swiping Gesture */}
      <motion.div
        className="relative w-full max-w-7xl h-[62vh] md:h-[72vh] flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        onPanEnd={(e, info) => {
          const swipeThreshold = 40;
          if (info.offset.x < -swipeThreshold) {
            handleNext();
          } else if (info.offset.x > swipeThreshold) {
            handlePrev();
          }
        }}
      >
        {images.map((url, idx) => {
          // Circular offset logic
          let offset = (idx - activeIndex + total) % total;
          if (offset > total / 2) {
            offset -= total;
          }

          const absOffset = Math.abs(offset);

          // Render only items in view
          const isVisible = absOffset <= 2;

          // Responsive coordinates - scaled for fullscreen layout
          const baseX = isMobile ? 140 : 540;
          const baseZ = isMobile ? -100 : -220;
          const baseY = isMobile ? -15 : -35; // Pinetree vertical lift for background cards
          const baseRotate = isMobile ? 16 : 26;

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
            scale = 0.8;
            opacity = 0.2; // Reduced opacity for side cards
          } else if (offset === 1) {
            x = baseX;
            y = baseY;
            z = baseZ;
            rotateY = -baseRotate;
            scale = 0.8;
            opacity = 0.2; // Reduced opacity for side cards
          } else if (offset === -2) {
            x = -baseX * 1.65;
            y = baseY * 2; // Scaled higher up
            z = baseZ * 1.8; // Deeper back
            rotateY = baseRotate * 1.35;
            scale = 0.65;
            opacity = 0.03; // Substantially transparent for far background
          } else if (offset === 2) {
            x = baseX * 1.65;
            y = baseY * 2;
            z = baseZ * 1.8;
            rotateY = -baseRotate * 1.35;
            scale = 0.65;
            opacity = 0.03; // Substantially transparent for far background
          }

          const isActive = offset === 0;

          return (
            <motion.div
              key={idx}
              style={{
                position: 'absolute',
                transformStyle: 'preserve-3d',
                transformOrigin: 'center center',
                visibility: isVisible ? 'visible' : 'hidden',
                pointerEvents: isActive ? 'auto' : (isVisible ? 'auto' : 'none'),
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
                type: 'tween',
                ease: [0.25, 1, 0.5, 1], // Decelerate ease
                duration: 0.45,
              }}
              onClick={() => {
                if (!isActive) {
                  setActiveIndex(idx);
                }
              }}
              // Storyteller fullscreen height card size
              className={`relative w-[85vw] h-[55vh] md:w-[78vw] md:max-w-6xl md:h-[68vh] rounded-3xl cursor-pointer select-none border border-[#494551]/30 bg-[#120f1a]
                ${isActive
                  ? 'shadow-[inset_0_1px_3px_rgba(255,255,255,0.15),_0_25px_50px_rgba(0,0,0,0.75)] border-white/10'
                  : 'shadow-lg border-white/5'
                }
              `}
            >
              {/* Frameless Image Wrapper */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden">
                <Image
                  src={url}
                  alt={`Team Image ${idx + 1}`}
                  fill
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 768px) 85vw, 1200px"
                  priority={isActive}
                />

                {/* Top Holographic Overlay Line */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#cfbdff]/25 to-transparent pointer-events-none" />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-85 pointer-events-none" />


              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
