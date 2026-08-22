import Image from 'next/image';
import { motion } from 'motion/react';
import { Calendar, MapPin, Cpu, ArrowRight } from 'lucide-react';
import { activeEvents } from '../../config/EventsView';
import { Qwigley } from 'next/font/google';

const qwigley = Qwigley({
  subsets: ['latin'],
  weight: ['400'],
});

export default function EventsView() {
  const categories = [
    '// FLAGSHIP COMPETITION // HIGH RISK',
    '// TORQUE CONTROL // MEDIUM RISK',
    '// JOINT HACKATHON // COLLABORATIVE',
    '// LINE FOLLOWER // AUTONOMOUS SLAM'
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-12 pt-2 px-4 max-w-7xl mx-auto text-[#09090a] font-sans">
      
      {/* 1. Hero Header Banner - Slide 1 / Slide 6 Brutalist Hybrid Bleeding to Top */}
      <section id="events-hero-section" className="relative w-screen left-1/2 -translate-x-1/2 -mt-24 md:-mt-28">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full min-h-[50vh] sm:min-h-[60vh] bg-[#ff3d00] text-white p-6 pb-12 sm:p-12 sm:pb-16 md:px-16 xl:px-28 pt-28 md:pt-36 overflow-hidden shadow-2xl flex flex-col justify-between border-b border-[#ff3d00] relative group select-none font-sans"
        >
          {/* Header Row Details */}
          <div className="flex justify-between items-center w-full z-10 font-cyber">
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase opacity-90 font-black">
              CYBORG DEPLOYMENT PROTOCOL
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-right opacity-90 font-black">
              NIT ROURKELA
            </span>
          </div>

          {/* Centered Large Distressed Title with Cursive Overlay */}
          <div className="relative my-auto flex flex-col items-center justify-center py-8 z-10 w-full">
            <h1 className="font-cyber font-black text-white text-7xl sm:text-[10rem] md:text-[12rem] tracking-tighter leading-none uppercase text-center w-full">
              CYB EVENTS
            </h1>
            <div 
              className={`${qwigley.className} absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[5deg] text-[#09090a] text-5xl sm:text-7xl md:text-[7.5rem] font-normal tracking-normal select-none pointer-events-none capitalize text-center whitespace-nowrap`}
              style={{ textShadow: '0 2px 10px rgba(255,255,255,0.1)' }}
            >
              Annual Combat &amp; Induction Protocols
            </div>
          </div>

          {/* Footer Row Details */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 w-full z-10 mt-auto pt-6 border-t border-white/25">
            <p className="max-w-md font-sans text-xs sm:text-sm text-white leading-relaxed opacity-95">
              Four core annual divisions testing structural limits, mechanical torque, and hardware-software sensor integration algorithms. Defy constraints and command the grid.
            </p>
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase font-black bg-[#09090a] px-3 py-1.5 rounded">
              NODE_STREAM // ACTIVE
            </span>
          </div>

          {/* Stylized crane silhouette in background */}
          <svg viewBox="0 0 100 100" className="absolute bottom-0 right-0 w-44 sm:w-64 md:w-96 h-auto opacity-15 sm:opacity-20 pointer-events-none fill-current text-[#09090a] translate-y-6 translate-x-6">
            <path d="M10 90 L20 90 L20 70 L50 20 L55 25 L25 75 L30 75 L80 15 L85 20 L35 80 L90 80 L90 90 Z" />
            <path d="M 50 20 L 90 20 L 90 25 L 53 25 Z" />
            <circle cx="20" cy="70" r="3" />
            <circle cx="50" cy="20" r="3" />
          </svg>
        </motion.div>
      </section>

      {/* 2. Redesigned Events Section - 'VISION' Slide Style + Notebook + DNA Divider */}
      <section id="events-grid-timeline" className="space-y-16">
        {activeEvents.map((evt, idx) => {
          const category = categories[idx % categories.length];

          return (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative w-full min-h-[420px] bg-black border-2 border-black rounded-3xl overflow-hidden flex flex-col md:flex-row group transition-all duration-300 hover:translate-x-[-3px] hover:translate-y-[-3px] shadow-[12px_12px_0px_#ff3d00,12px_12px_20px_rgba(255,61,0,0.12)] hover:shadow-[15px_15px_0px_#ff3d00,15px_15px_25px_rgba(255,61,0,0.22)]"
            >
              {/* Spiral Notebook Wire Binder on Left Edge */}
              <div className="absolute left-3.5 top-0 bottom-0 w-6 flex flex-col justify-around py-6 z-30 pointer-events-none select-none">
                {Array.from({ length: 9 }).map((_, rIdx) => (
                  <div key={rIdx} className="relative flex items-center justify-center">
                    {/* punched hole showing the cream background */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[#fffae5] border border-black/25 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]" />
                    {/* 3D wire ring loop extending leftwards */}
                    <div className="absolute -left-3.5 w-5 h-2 bg-gradient-to-r from-neutral-400 via-neutral-200 to-neutral-600 rounded-full border border-black/20 shadow-md transform -rotate-12" />
                  </div>
                ))}
              </div>

              {/* Left Half: Large B&W Photo Container (50% Width) */}
              <div className="relative w-full md:w-1/2 min-h-[280px] md:min-h-full overflow-hidden select-none bg-[#09090b] p-6 pl-14 flex items-center justify-center">
                
                {/* Brand Logo Corner Tag (Brutalist style) */}
                <Cpu className="absolute top-6 left-12 text-[#ff3d00] w-6.5 h-6.5 z-20 pointer-events-none" />

                {/* Event Image centered in its container showing full dimensions */}
                <div className="relative w-full h-full min-h-[240px]">
                  <Image
                    alt={evt.title}
                    fill
                    className="object-contain grayscale contrast-125 group-hover:scale-[1.03] group-hover:grayscale-0 transition-all duration-700 pointer-events-none"
                    src={evt.image}
                    priority={idx === 0}
                  />
                </div>
                
                {/* Subtle orange filter overlay */}
                <div className="absolute inset-0 bg-[#ff3d00]/8 mix-blend-multiply pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
              </div>

              {/* Middle: DNA double-helix thin wavy divider */}
              <div className="hidden md:flex flex-col items-center justify-center w-6 shrink-0 relative z-10 self-stretch my-4">
                <svg className="w-full h-full text-[#ff3d00] opacity-80" viewBox="0 0 24 400" preserveAspectRatio="none">
                  {/* Helix strand A */}
                  <path 
                    d="M 12 0 C 24 25, 0 25, 12 50 C 24 75, 0 75, 12 100 C 24 125, 0 125, 12 150 C 24 175, 0 175, 12 200 C 24 225, 0 225, 12 250 C 24 275, 0 275, 12 300 C 24 325, 0 325, 12 350 C 24 375, 0 375, 12 400" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                  />
                  {/* Helix strand B (dashed) */}
                  <path 
                    d="M 12 0 C 0 25, 24 25, 12 50 C 0 75, 24 75, 12 100 C 0 125, 24 125, 12 150 C 0 175, 24 175, 12 200 C 0 225, 24 225, 12 250 C 0 275, 24 275, 12 300 C 0 325, 24 325, 12 350 C 0 375, 24 375, 12 400" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeDasharray="4,4" 
                  />
                </svg>
              </div>

              {/* Right Half: Solid Black Content Container (50% Width) with ruled lines */}
              <div 
                className="p-8 sm:p-10 flex flex-col justify-between flex-1 text-left relative overflow-hidden z-10 text-white"
                style={{
                  backgroundColor: '#000000',
                  backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
                  backgroundSize: '100% 28px',
                  backgroundPosition: '0 10px',
                  backgroundRepeat: 'repeat',
                }}
              >
                {/* Top Row: category details */}
                <div className="flex justify-between items-center w-full font-mono text-[9px] z-10">
                  <span className="font-cyber font-black tracking-[0.25em] text-[#ff3d00] uppercase">
                    {category}
                  </span>
                  <span className="text-[#948e9c] tracking-widest font-black uppercase">
                    BORCELLE 2026
                  </span>
                </div>

                {/* Center Content: description and metadata aligned to rule lines */}
                <div className="my-6 z-10">
                  <p 
                    className="text-xs sm:text-sm text-[#cac4d2]/90 font-light mt-4 mb-6 leading-relaxed"
                    style={{ lineHeight: '28px' }}
                  >
                    {evt.description}
                  </p>
                  
                  <div className="flex gap-4 text-[10px] font-mono text-[#cac4d2]/70 border-t border-white/5 pt-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#ff3d00]" />
                      {evt.date}
                    </span>
                    {evt.venue && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#ff9100]" />
                        {evt.venue}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Row: Massive title & Scribble underline overlay + deploy button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-6 border-t border-white/5 mt-auto z-10">
                  <div className="relative">
                    <h4 className="font-cyber font-black text-white text-4xl sm:text-5xl uppercase tracking-tighter leading-none select-none relative mb-2 pr-4 z-10">
                      {evt.title}
                    </h4>
                    {/* Hand-drawn orange scribble overlay underneath title */}
                    <svg viewBox="0 0 100 20" className="absolute -bottom-3 left-0 w-36 h-6 text-[#ff3d00] pointer-events-none z-0" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M 5,10 C 25,2 75,18 95,10 C 75,15 25,5 15,12" strokeLinecap="round" />
                    </svg>
                  </div>

                  {evt.ps ? (
                    <a
                      href={evt.ps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-6 bg-transparent border border-[#ff3d00]/30 hover:bg-[#ff3d00]/10 text-white font-cyber font-bold text-[9px] tracking-widest uppercase rounded-none transition-all flex items-center justify-center gap-2 cursor-pointer z-20"
                    >
                      <span>DEPLOY_UNIT</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#ff3d00]" />
                    </a>
                  ) : (
                    <span className="py-2.5 px-6 border border-white/10 text-white/40 font-cyber font-bold text-[9px] tracking-widest uppercase rounded-none cursor-not-allowed z-20">
                      PORTAL_OFFLINE
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* 3. Overview Legacy Section - Slide 8 style */}
      <section id="events-overview-section" className="w-full max-w-7xl mx-auto">
        <div className="bg-black border-2 border-black rounded-3xl p-8 relative overflow-hidden group shadow-[12px_12px_0px_#ff3d00,12px_12px_20px_rgba(255,61,0,0.12)] text-left transition-all duration-300 hover:border-[#ff3d00]/25 text-white hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[15px_15px_0px_#ff3d00,15px_15px_25px_rgba(255,61,0,0.22)]">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#ff3d00]/5 group-hover:bg-[#ff3d00]/10 blur-3xl rounded-full transition-all duration-500 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="p-4 rounded-none bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <Cpu className="text-[#ff3d00] w-8 h-8" />
            </div>
            
            <div className="space-y-3">
              <span className="font-cyber text-[9px] text-[#ff9100] tracking-widest font-black uppercase block block">// SYSTEM_DATABASE</span>
              <h3 className="font-cyber text-2xl tracking-wider text-white uppercase leading-none">OUR LEGACY &amp; HISTORY</h3>
              <p className="font-sans text-xs sm:text-sm text-[#cac4d2]/90 leading-relaxed font-light">
                We at Cyborg host four massive flagship events annually, fostering innovation, engineering expertise, and hardware-software teamwork. Join us for hands-on competitive arenas, workshops, hackathons, and induction challenges. Command the platform and level up your skills.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
