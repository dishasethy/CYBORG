import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Activity, GitCommit } from 'lucide-react';

interface SectionConnectorProps {
  label?: string;
  sublabel?: string;
  nodeId?: string;
  variant?: 'circuit' | 'pulse' | 'junction';
}

export default function SectionConnector({
  label = 'SYSTEM BUS INTEGRATION',
  sublabel = 'DATA_STREAM_ACTIVE',
  nodeId = 'NODE_01',
  variant = 'circuit'
}: SectionConnectorProps) {
  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 flex flex-col items-center justify-center relative overflow-hidden select-none">
      <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-[#9a83db]/60 to-[#cfbdff]/80 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#9a83db] rounded-full" />
      </div>

      <div className="w-full flex items-center justify-center gap-2 md:gap-4 my-1">
        <div className="flex-1 flex items-center">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#cfbdff]/20 to-[#9a83db]/70 relative">
            <motion.div
              animate={{ x: ['0%', '100%'], opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 -translate-y-1/2 w-3 h-1 bg-[#9a83db] rounded-full"
            />
          </div>
          <div className="w-2 h-2 rounded-full border border-[#9a83db] bg-[#09080e] shrink-0 hidden sm:block" />
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="neo-btn px-4 py-2 rounded-2xl border border-[#cfbdff]/30 bg-[#120f1a] flex items-center gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.8)] relative group z-10"
        >
          <div className="p-1.5 rounded-lg bg-[#1d182b] border border-[#9a83db]/40 text-[#9a83db] relative z-10">
            {variant === 'pulse' ? (
              <Activity className="w-3.5 h-3.5" />
            ) : variant === 'junction' ? (
              <GitCommit className="w-3.5 h-3.5 text-[#cfbdff]" />
            ) : (
              <Cpu className="w-3.5 h-3.5 text-[#9a83db]" />
            )}
          </div>

          <div className="flex flex-col text-left relative z-10">
            <div className="flex items-center gap-2">
              <span className="font-cyber text-[9px] tracking-[0.2em] text-[#e6e1e9] font-bold uppercase">
                {label}
              </span>
              <span className="text-[8px] font-mono text-[#9a83db] bg-[#9a83db]/10 px-1.5 py-0.5 rounded border border-[#9a83db]/30">
                {nodeId}
              </span>
            </div>
            <span className="font-mono text-[8px] tracking-widest text-[#948e9c] uppercase">
              {sublabel}
            </span>
          </div>

          <div className="w-2 h-2 rounded-full bg-[#9a83db] ml-1 relative z-10" />
        </motion.div>

        <div className="flex-1 flex items-center">
          <div className="w-2 h-2 rounded-full border border-[#cfbdff] bg-[#09080e] shrink-0 hidden sm:block" />
          <div className="h-[1px] w-full bg-gradient-to-l from-transparent via-[#cfbdff]/20 to-[#9a83db]/70 relative">
            <motion.div
              animate={{ x: ['100%', '0%'], opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: 1.25 }}
              className="absolute top-1/2 -translate-y-1/2 w-3 h-1 bg-[#cfbdff] rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="w-[1px] h-8 bg-gradient-to-b from-[#cfbdff]/80 via-[#9a83db]/60 to-transparent relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#cfbdff] rounded-full" />
      </div>
    </div>
  );
}
