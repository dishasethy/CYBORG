'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    // Only run on client-side and fine pointer (desktop-like scroll experience)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !isTouch, // only smooth wheel on desktops
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Synchronize ScrollTrigger updates with Lenis scrolling
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Wire Lenis into GSAP's global ticker loop for frame-perfect sync
    const gsapTickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(gsapTickerCallback);

    // Disable lag smoothing to prevent desyncs
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(gsapTickerCallback);
    };
  }, []);

  return null;
}
