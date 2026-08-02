import { motion } from 'motion/react';
import { Award, ShieldCheck, CheckCircle2, Terminal, Activity } from 'lucide-react';
import { achievements, achievementStats, verifiedDecryptionLogs } from '../../config/AchievementsView';

export default function AchievementsView() {
  const endlessLoopList = [...achievements, ...achievements];

  return (
    <div className="space-y-16">
      {/* Page Header */}
      <section id="achievements-header" className="flex flex-col md:flex-row justify-between items-baseline border-b border-[#494551]/20 pb-6">
        <div>
          <h2 className="font-cyber text-xl md:text-3xl font-black text-white uppercase tracking-tight">Wall_of_Excellency</h2>
          <p className="font-mono text-[10px] text-[#948e9c] mt-1">VERIFIED MAIN_NODES // ARCHIVAL SUCCESS VERIFICATION</p>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-[#00F2FF]">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>CYBORG_STREAK: 100% SUCCESS RATIO</span>
        </div>
      </section>



      <style>{`
        @keyframes scroll-horizontal-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .scroll-h-right {
          animation: scroll-horizontal-right 50s linear infinite;
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
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#cfbdff]" />
              <h3 className="font-cyber font-bold text-xs uppercase tracking-wider text-white">Live_Datalink_Feed</h3>
            </div>

            {/* Carousel 1: Left-moving */}
            <div className="carousel-container relative overflow-hidden h-44 glass-panel rounded-2xl flex items-center">
              <div className="flex gap-4 px-4 scroll-h-left absolute whitespace-nowrap">
                {endlessLoopList.map((ach, idx) => (
                  <div
                    key={`h1-${ach.id}-${idx}`}
                    className="inline-flex flex-col justify-between p-6 glass-card rounded-xl h-32 w-80 shrink-0 select-none cursor-crosshair"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[8px] text-[#00F2FF] tracking-widest">{ach.category}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-xs text-white truncate">{ach.title}</h4>
                      <p className="font-mono text-[8px] text-[#948e9c] mt-1">{ach.status} // {ach.logId}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-black/80 to-transparent pointer-events-none z-10" />
              <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-black/80 to-transparent pointer-events-none z-10" />
            </div>

            {/* Carousel 2: Right-moving (moving from left to right) */}
            <div className="carousel-container relative overflow-hidden h-44 glass-panel rounded-2xl flex items-center">
              <div className="flex gap-4 px-4 scroll-h-right absolute whitespace-nowrap">
                {endlessLoopList.map((ach, idx) => (
                  <div
                    key={`h2-${ach.id}-${idx}`}
                    className="inline-flex flex-col justify-between p-6 glass-card rounded-xl h-32 w-80 shrink-0 select-none cursor-crosshair"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[8px] text-[#cfbdff] tracking-widest">{ach.category}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-xs text-white truncate">{ach.title}</h4>
                      <p className="font-mono text-[8px] text-[#948e9c] mt-1">{ach.status} // {ach.logId}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-black/80 to-transparent pointer-events-none z-10" />
              <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-black/80 to-transparent pointer-events-none z-10" />
            </div>
          </div>
        </div>

        {/* Vertical Scrolling Feed (4 columns) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00F2FF]" />
            <h3 className="font-cyber font-bold text-xs uppercase tracking-wider text-white">Mainframe_System_Logs</h3>
          </div>

          <div className="carousel-container relative overflow-hidden h-[368px] glass-panel rounded-2xl flex-grow">
            <div className="scroll-v-down absolute flex flex-col gap-4 w-full p-4">
              {endlessLoopList.map((ach, idx) => (
                <div
                  key={`v-${ach.id}-${idx}`}
                  className="p-4 glass-card rounded-xl flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] text-[#9a83db]">{ach.logId}</span>
                    <h5 className="font-sans font-medium text-[11px] text-[#cac4d2] truncate max-w-[180px]">{ach.title}</h5>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[8px] text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>SYS_OK</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
          </div>
        </div>

      </section>

      {/* Grid of detailed accomplishments */}
      <section id="milestones-deepdive" className="max-w-6xl mx-auto space-y-6">
        <h3 className="font-cyber font-bold text-xs uppercase tracking-widest text-glow-purple text-[#cfbdff]">Verified_Decryption_Grid</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {verifiedDecryptionLogs.map((log, idx) => (
            <div
              key={idx}
              className={`glass-card ${log.glowBorder === 'cyan' ? 'border-l-4 border-l-[#00F2FF]/70' : 'border-l-4 border-l-[#cfbdff]/70'} p-6 rounded-2xl space-y-2`}
            >
              <span className={`font-mono text-[8px] ${log.glowBorder === 'cyan' ? 'text-[#00F2FF]' : 'text-[#cfbdff]'}`}>
                {log.logId}
              </span>
              <h4 className="font-sans font-bold text-sm text-white">{log.title}</h4>
              <p className="font-sans text-xs text-[#cac4d2] leading-relaxed">
                {log.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
