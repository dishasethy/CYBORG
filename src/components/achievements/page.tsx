import { motion } from 'motion/react';
import { Award, CheckCircle2, Terminal, Activity } from 'lucide-react';
import { achievements, achievementStats, verifiedDecryptionLogs } from '../../config/AchievementsView';

export default function AchievementsView() {
  const endlessLoopList = [...achievements, ...achievements];

  const SPIRAL_COLORS = [
    { bg: '#fefcbf', text: '#2d2509', line: 'rgba(183, 121, 31, 0.15)', margin: 'rgba(239, 68, 68, 0.45)', category: '#744210' }, // Yellow
    { bg: '#e6fffa', text: '#00443e', line: 'rgba(49, 151, 149, 0.15)', margin: 'rgba(239, 68, 68, 0.45)', category: '#00564d' }, // Teal
    { bg: '#ebf8ff', text: '#1a365d', line: 'rgba(66, 153, 225, 0.15)', margin: 'rgba(239, 68, 68, 0.45)', category: '#1e3a8a' }, // Blue
    { bg: '#fff5f5', text: '#6b1d1d', line: 'rgba(245, 101, 101, 0.15)', margin: 'rgba(239, 68, 68, 0.45)', category: '#9b2c2c' }, // Red
    { bg: '#fdf2f8', text: '#4a1228', line: 'rgba(236, 72, 153, 0.15)', margin: 'rgba(239, 68, 68, 0.45)', category: '#831843' }, // Pink
  ];

  const getSpiralStyle = (idx: number) => {
    const colors = SPIRAL_COLORS[idx % SPIRAL_COLORS.length];
    return {
      style: {
        backgroundColor: colors.bg,
        color: colors.text,
        backgroundImage: `linear-gradient(${colors.line} 1px, transparent 1px)`,
        backgroundSize: '100% 22px',
      },
      className: 'shadow-[5px_5px_15px_rgba(0,0,0,0.55)] border-none relative transition-transform duration-300 hover:scale-103',
      colors
    };
  };

  return (
    <div className="space-y-16">
      {/* Page Header */}
      <section id="achievements-header" className="flex flex-col md:flex-row justify-between items-baseline border-b border-[#494551]/20 pb-6">
        <div>
          <h2 className="font-cyber text-xl md:text-3xl font-black text-white uppercase tracking-tight">Wall of Excellency</h2>

        </div>

      </section>

      <style>{`
        @keyframes scroll-horizontal-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .scroll-h-right {
          animation: scroll-horizontal-right 95s linear infinite;
        }
        .carousel-container:hover .scroll-h-right {
          animation-play-state: paused;
        }
      `}</style>

      {/* Scrolling Carousels (Endless horizontal and vertical) */}
      <section id="endless-scrolling-carousels" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-[92vw] mx-auto">

        {/* Horizontal Scrolling Feed (8 columns) */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">


            {/* Carousel 1: Left-moving */}
            <div className="carousel-container relative overflow-hidden h-44 glass-panel rounded-2xl flex items-center">
              <div className="flex gap-4 px-4 scroll-h-left absolute whitespace-nowrap">
                {endlessLoopList.map((ach, idx) => {
                  const card = getSpiralStyle(idx);
                  return (
                    <div
                      key={`h1-${ach.id}-${idx}`}
                      className={`inline-flex flex-col justify-between p-6 pl-12 h-32 w-80 shrink-0 select-none cursor-crosshair rounded-md ${card.className}`}
                      style={card.style}
                    >
                      {/* Margin line */}
                      <div className="absolute left-9 top-0 bottom-0 w-[1px]" style={{ backgroundColor: card.colors.margin }} />
                      
                      {/* Spiral rings */}
                      <div className="absolute left-2.5 top-0 bottom-0 w-3 flex flex-col justify-around py-4 pointer-events-none z-20">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="relative flex items-center justify-center">
                            <div className="w-2 h-2 bg-black/70 rounded-full shadow-inner" />
                            <div className="w-5 h-1.5 bg-gradient-to-r from-stone-400 via-stone-100 to-stone-500 rounded-full absolute -left-3.5 shadow-sm border-t border-white/50" />
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-start gap-2">
                        <span className="font-mono text-[9px] font-black uppercase tracking-widest truncate block max-w-[200px]" style={{ color: card.colors.category }} title={ach.category}>
                          {ach.category}
                        </span>
                        <CheckCircle2 className="w-4 h-4 shrink-0 opacity-60" />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-xs leading-snug">{ach.title}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-black/80 to-transparent pointer-events-none z-10" />
              <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-black/80 to-transparent pointer-events-none z-10" />
            </div>

            {/* Carousel 2: Right-moving (moving from left to right) */}
            <div className="carousel-container relative overflow-hidden h-44 glass-panel rounded-2xl flex items-center">
              <div className="flex gap-4 px-4 scroll-h-right absolute whitespace-nowrap">
                {endlessLoopList.map((ach, idx) => {
                  const card = getSpiralStyle(idx + 5);
                  return (
                    <div
                      key={`h2-${ach.id}-${idx}`}
                      className={`inline-flex flex-col justify-between p-6 pl-12 h-32 w-80 shrink-0 select-none cursor-crosshair rounded-md ${card.className}`}
                      style={card.style}
                    >
                      {/* Margin line */}
                      <div className="absolute left-9 top-0 bottom-0 w-[1px]" style={{ backgroundColor: card.colors.margin }} />
                      
                      {/* Spiral rings */}
                      <div className="absolute left-2.5 top-0 bottom-0 w-3 flex flex-col justify-around py-4 pointer-events-none z-20">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="relative flex items-center justify-center">
                            <div className="w-2 h-2 bg-black/70 rounded-full shadow-inner" />
                            <div className="w-5 h-1.5 bg-gradient-to-r from-stone-400 via-stone-100 to-stone-500 rounded-full absolute -left-3.5 shadow-sm border-t border-white/50" />
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-start gap-2">
                        <span className="font-mono text-[9px] font-black uppercase tracking-widest truncate block max-w-[200px]" style={{ color: card.colors.category }} title={ach.category}>
                          {ach.category}
                        </span>
                        <CheckCircle2 className="w-4 h-4 shrink-0 opacity-60" />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-xs leading-snug">{ach.title}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-black/80 to-transparent pointer-events-none z-10" />
              <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-black/80 to-transparent pointer-events-none z-10" />
            </div>
          </div>
        </div>

        {/* Vertical Scrolling Feed (4 columns) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">


          <div className="carousel-container relative overflow-hidden h-[368px] glass-panel rounded-2xl flex-grow">
            <div className="scroll-v-down absolute flex flex-col gap-4 w-full p-4">
              {endlessLoopList.map((ach, idx) => {
                const card = getSpiralStyle(idx + 10);
                return (
                  <div
                    key={`v-${ach.id}-${idx}`}
                    className={`p-4 pl-10 rounded-md flex items-center justify-between ${card.className}`}
                    style={card.style}
                  >
                    {/* Margin line */}
                    <div className="absolute left-7 top-0 bottom-0 w-[1px]" style={{ backgroundColor: card.colors.margin }} />
                    
                    {/* Spiral rings */}
                    <div className="absolute left-2 top-0 bottom-0 w-3 flex flex-col justify-around py-2 pointer-events-none z-20">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="relative flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-black/70 rounded-full shadow-inner" />
                          <div className="w-4 h-1 bg-gradient-to-r from-stone-400 via-stone-100 to-stone-500 rounded-full absolute -left-2.5 shadow-sm border-t border-white/50" />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-sans font-bold text-[11px] leading-snug">{ach.title}</h5>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
          </div>
        </div>

      </section>

      {/* Grid of detailed accomplishments */}
      <section id="milestones-deepdive" className="max-w-6xl mx-auto space-y-6">
        <h3 className="font-cyber font-bold text-xs uppercase tracking-widest text-glow-purple text-[#cfbdff]">Verified Achievements Grid</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {verifiedDecryptionLogs.map((log, idx) => {
            const card = getSpiralStyle(idx + 15);
            return (
              <div
                key={idx}
                className={`p-6 pl-12 rounded-md space-y-3 ${card.className}`}
                style={card.style}
              >
                {/* Margin line */}
                <div className="absolute left-9 top-0 bottom-0 w-[1px]" style={{ backgroundColor: card.colors.margin }} />
                
                {/* Spiral rings */}
                <div className="absolute left-2.5 top-0 bottom-0 w-3 flex flex-col justify-around py-4 pointer-events-none z-20">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="relative flex items-center justify-center">
                      <div className="w-2 h-2 bg-black/70 rounded-full shadow-inner" />
                      <div className="w-5 h-1.5 bg-gradient-to-r from-stone-400 via-stone-100 to-stone-500 rounded-full absolute -left-3.5 shadow-sm border-t border-white/50" />
                    </div>
                  ))}
                </div>
                <h4 className="font-sans font-black text-sm leading-snug">{log.title}</h4>
                <p className="font-sans text-xs leading-relaxed opacity-95">
                  {log.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
