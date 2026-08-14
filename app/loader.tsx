import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Activity, Terminal } from 'lucide-react';
import Image from 'next/image';

interface LoaderProps {
    onComplete?: () => void;
    durationMs?: number;
}

interface BgParticle {
    id: number;
    size: number;
    left: number;
    top: number;
    duration: number;
    xOffsets: number[];
    yOffsets: number[];
    color: string;
}

export default function Loader({ onComplete, durationMs = 1800 }: LoaderProps) {
    const [progress, setProgress] = useState<number>(0);
    const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
    const [bgParticles, setBgParticles] = useState<BgParticle[]>([]);

    useEffect(() => {
        const startTime = Date.now();

        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const currentProgress = Math.min((elapsed / durationMs) * 100, 100);
            setProgress(currentProgress);

            if (elapsed >= durationMs) {
                clearInterval(progressInterval);
                setIsFadingOut(true);
                setTimeout(() => {
                    onComplete?.();
                }, 1200); // Match the door slide transition duration
            }
        }, 16);

        // Generate hydration-safe background particles matching InteractiveBg
        const colors = [
            'bg-[#00f2ff]/20', // cyan
            'bg-[#cfbdff]/20', // light purple
            'bg-[#9a83db]/15', // deep purple
        ];
        const generated = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            size: Math.random() * 2.5 + 1.2,
            left: Math.random() * 100,
            top: Math.random() * 100,
            duration: 10 + Math.random() * 12,
            xOffsets: [0, (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 80, 0],
            yOffsets: [0, (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 80, 0],
            color: colors[i % colors.length],
        }));
        setBgParticles(generated);

        return () => {
            clearInterval(progressInterval);
        };
    }, [durationMs, onComplete]);

    const doorTransition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

    return (
        <AnimatePresence>
            {!isFadingOut && (
                <motion.div
                    key="loader-wrapper"
                    exit={{ opacity: 1 }}
                    transition={doorTransition}
                    className="fixed inset-0 z-[9999] select-none pointer-events-none flex overflow-hidden bg-transparent"
                >
                    {/* LEFT MECHANICAL DOOR PANEL */}
                    <motion.div
                        key="left-door"
                        initial={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={doorTransition}
                        className="w-[50vw] h-screen bg-[#0b0a11]/80 backdrop-blur-[24px] border-r-2 border-[#2f2b3e]/60 flex items-center justify-end overflow-hidden pointer-events-auto relative shadow-[10px_0_40px_rgba(0,0,0,0.8)]"
                    >
                        {/* Dark Pattern Background Grid */}
                        <div className="absolute inset-0 opacity-25 hud-grid pointer-events-none" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0b0a11]/50 to-[#0b0a11] pointer-events-none" />

                        {/* Floating Background Particles */}
                        {bgParticles.slice(0, 15).map((p) => (
                            <motion.div
                                key={`bg-p-${p.id}`}
                                style={{
                                    position: 'absolute',
                                    left: `${p.left}%`,
                                    top: `${p.top}%`,
                                    width: p.size,
                                    height: p.size,
                                }}
                                animate={{
                                    x: p.xOffsets,
                                    y: p.yOffsets,
                                }}
                                transition={{
                                    duration: p.duration,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className={`${p.color} rounded-full pointer-events-none`}
                            />
                        ))}

                        {/* Liquid Dark Gray Swirls */}
                        <motion.div
                            animate={{
                                x: [0, 50, -30, 0],
                                y: [0, -60, 40, 0],
                                scale: [1, 1.2, 0.9, 1],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute -left-12 top-1/4 w-80 h-80 rounded-full bg-gray-600/10 blur-[90px] pointer-events-none"
                        />
                        
                        {/* Mechanical Edge Detailing */}
                        <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-transparent via-gray-500/20 to-transparent pointer-events-none" />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-8 opacity-40">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-1 h-8 bg-gray-500 rounded-full" />
                            ))}
                        </div>
                    </motion.div>

                     {/* RIGHT MECHANICAL DOOR PANEL */}
                    <motion.div
                        key="right-door"
                        initial={{ x: 0 }}
                        exit={{ x: '105%' }} // Extra 5% threshold to ensure clean clearing
                        transition={doorTransition}
                        className="w-[50vw] h-screen bg-[#0b0a11]/80 backdrop-blur-[24px] border-l-2 border-[#2f2b3e]/60 flex items-center justify-start overflow-hidden pointer-events-auto relative shadow-[-10px_0_40px_rgba(0,0,0,0.8)]"
                    >
                        {/* Dark Pattern Background Grid */}
                        <div className="absolute inset-0 opacity-25 hud-grid pointer-events-none" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0b0a11]/50 to-[#0b0a11] pointer-events-none" />

                        {/* Floating Background Particles */}
                        {bgParticles.slice(15).map((p) => (
                            <motion.div
                                key={`bg-p-${p.id}`}
                                style={{
                                    position: 'absolute',
                                    left: `${p.left}%`,
                                    top: `${p.top}%`,
                                    width: p.size,
                                    height: p.size,
                                }}
                                animate={{
                                    x: p.xOffsets,
                                    y: p.yOffsets,
                                }}
                                transition={{
                                    duration: p.duration,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className={`${p.color} rounded-full pointer-events-none`}
                            />
                        ))}

                        {/* Liquid Dark Gray Swirls */}
                        <motion.div
                            animate={{
                                x: [0, -50, 30, 0],
                                y: [0, 60, -40, 0],
                                scale: [1, 0.9, 1.2, 1],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute -right-12 bottom-1/4 w-80 h-80 rounded-full bg-gray-500/10 blur-[100px] pointer-events-none"
                        />

                        {/* Mechanical Edge Detailing */}
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-transparent via-gray-500/20 to-transparent pointer-events-none" />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-8 opacity-40">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-1 h-8 bg-gray-500 rounded-full" />
                            ))}
                        </div>
                    </motion.div>

                    {/* CENTER HUD PANEL (Transparent/Liquid Glass) */}
                    <div className="fixed inset-0 flex items-center justify-center z-[10000] p-6 pointer-events-none">
                        
                        {/* Particle Explosion on Exit */}
                        {[...Array(120)].map((_, i) => {
                            const angle = (i / 120) * Math.PI * 2;
                            const radius = 100 + Math.random() * 400;
                            const x = Math.cos(angle) * radius;
                            const y = Math.sin(angle) * radius;
                            return (
                                <motion.div
                                    key={`particle-${i}`}
                                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                                    exit={{ 
                                        opacity: [0, 1, 0], 
                                        x: x, 
                                        y: y, 
                                        scale: [0, Math.random() + 0.5, 0],
                                        rotate: Math.random() * 360
                                    }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute w-2 h-2 bg-gray-400 rounded-sm shadow-[0_0_12px_rgba(255,255,255,0.5)]"
                                />
                            );
                        })}

                        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 max-w-6xl w-full">
                            
                            {/* LEFT DIAGNOSTIC MODULE (Desktop only) */}
                            <motion.div
                                initial={{ opacity: 0, x: -35 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -35, transition: { duration: 0.4 } }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="hidden lg:flex pointer-events-auto flex-col w-64 bg-gradient-to-br from-[#9a83db]/30 via-transparent to-[#00f2ff]/20 p-[1.5px]"
                                style={{
                                    clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)',
                                    transformStyle: 'preserve-3d',
                                    perspective: '1000px'
                                }}
                            >
                                <div 
                                    className="bg-[#0b0a11]/85 backdrop-blur-2xl p-5 space-y-6 font-mono text-[10px] min-h-[350px] flex flex-col justify-between"
                                    style={{
                                        clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)'
                                    }}
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 border-b border-[#00f2ff]/25 pb-2 text-[#00f2ff] font-bold tracking-wider uppercase">
                                            <Activity className="w-3.5 h-3.5 animate-pulse text-[#00f2ff]" />
                                            <span>SYS_TELEMETRY</span>
                                        </div>

                                        {/* Data points */}
                                        <div className="space-y-3 text-gray-400">
                                            <div className="flex justify-between">
                                                <span>CORE_STATUS:</span>
                                                <span className="text-[#cfbdff] font-bold">ONLINE</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>SYS_TEMP:</span>
                                                <span className="text-[#00f2ff] font-bold">{(38.2 + (progress * 0.12)).toFixed(1)} °C</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>MEM_ALLOC:</span>
                                                <span className="text-gray-200">{(1.24 + (progress * 0.015)).toFixed(2)} GB</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>LINK_RATE:</span>
                                                <span className="text-[#00f2ff]">984.8 GB/s</span>
                                            </div>
                                        </div>

                                        {/* sector grid */}
                                        <div className="space-y-2 pt-2 border-t border-white/5">
                                            <span className="text-gray-500 uppercase tracking-widest text-[9px] block">GRID_SECTORS</span>
                                            <div className="grid grid-cols-6 gap-1 p-2 bg-black/40 border border-white/5 rounded">
                                                {[...Array(24)].map((_, idx) => {
                                                    const isActive = (idx * 4.2) < progress;
                                                    const isBlinking = idx % 7 === 0;
                                                    return (
                                                        <div 
                                                            key={idx} 
                                                            className={`h-2 rounded-[1px] transition-all duration-200 ${
                                                                isActive 
                                                                    ? 'bg-[#00f2ff]/80 shadow-[0_0_6px_rgba(0,242,255,0.6)]' 
                                                                    : 'bg-[#9a83db]/10'
                                                            } ${isBlinking && progress < 100 ? 'animate-pulse' : ''}`}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-[8px] text-gray-500 leading-normal border-t border-white/5 pt-3">
                                        [SECURE COMPLIANCE: GEN-8 V.14]
                                        <br/>
                                        LOC: SEC-D3_BAY9
                                    </div>
                                </div>
                            </motion.div>

                            {/* MAIN BRAND CARD */}
                            <motion.div
                                key="loader-brand-card"
                                initial={{ opacity: 1, scale: 0.9, rotateX: 0, rotateY: 0 }}
                                animate={{ 
                                    rotateX: [3, -3, 3], 
                                    rotateY: [-5, 5, -5],
                                    y: [-4, 4, -4],
                                }}
                                exit={{ 
                                    opacity: 0, 
                                    scale: 1.3, 
                                    filter: 'blur(20px)',
                                    y: -50,
                                    rotateX: 20,
                                    rotateY: 0,
                                    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="pointer-events-auto relative flex flex-col items-center bg-gradient-to-br from-[#00f2ff]/30 via-transparent to-[#9a83db]/20 p-[1.5px] max-w-lg w-full shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),_0_0_50px_rgba(0,242,255,0.12)]"
                                style={{
                                    clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)',
                                    transformStyle: 'preserve-3d',
                                    perspective: '1000px'
                                }}
                            >
                                <div 
                                    className="w-full h-full bg-[#0d0b16]/85 backdrop-blur-3xl px-8 py-10 sm:px-12 sm:py-12 flex flex-col items-center space-y-8 relative overflow-hidden"
                                    style={{
                                        clipPath: 'polygon(29px 0, 100% 0, 100% calc(100% - 29px), calc(100% - 29px) 100%, 0 100%, 0 29px)'
                                    }}
                                >
                                    {/* Inner Grid Pattern */}
                                    <div className="absolute inset-0 opacity-15 hud-grid pointer-events-none" />

                                    {/* Inner Liquid Glow Orbs */}
                                    <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-[#00f2ff]/10 blur-2xl pointer-events-none animate-pulse" />
                                    <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-[#9a83db]/10 blur-2xl pointer-events-none animate-pulse" />

                                    {/* Glossy Diagonal Shine Sheen */}
                                    <motion.div
                                        animate={{ x: ['-150%', '300%'] }}
                                        transition={{ duration: 5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                                        className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
                                    />

                                    {/* Cybernetic HUD Scanline Overlay */}
                                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f2ff]/40 to-transparent absolute top-0 animate-[scan_4s_linear_infinite]" />
                                    </div>

                                    {/* Blinking LEDs / Status bar at top */}
                                    <div className="absolute top-4 left-6 right-6 flex justify-between items-center text-[8px] font-mono tracking-widest text-[#00f2ff]/75 pointer-events-none select-none">
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#00f2ff] animate-ping" />
                                            <span>SECURE BOOT INTERFACE</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1 bg-[#00f2ff]/80" />
                                            <span className="w-1.5 h-1 bg-[#00f2ff]/80" />
                                            <span className="w-1.5 h-1 bg-[#9a83db]/40" />
                                        </div>
                                    </div>

                                    {/* Tech Corner Accents (Sharp HUD framing inside borders) */}
                                    <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-[#00f2ff]/55 pointer-events-none" style={{ transform: 'translateZ(10px)' }} />
                                    <div className="absolute top-6 right-6 w-3 h-3 border-t border-r border-[#00f2ff]/55 pointer-events-none" style={{ transform: 'translateZ(10px)' }} />
                                    <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-[#00f2ff]/55 pointer-events-none" style={{ transform: 'translateZ(10px)' }} />
                                    <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-[#00f2ff]/55 pointer-events-none" style={{ transform: 'translateZ(10px)' }} />

                                    {/* Glowing CPU/Core Icon with Tech Rings (TranslateZ: 40px) */}
                                    <div className="relative flex items-center justify-center h-20 w-20 pt-2" style={{ transform: 'translateZ(40px)' }}>
                                        <div className="absolute inset-0 bg-[#00f2ff]/20 blur-xl rounded-full w-20 h-20 animate-pulse" />
                                        
                                        {/* Concentric Tech Rings */}
                                        <div className="absolute w-16 h-16 border border-dashed border-[#00f2ff]/30 rounded-full animate-[spin_8s_linear_infinite]" />
                                        <div className="absolute w-[72px] h-[72px] border border-dotted border-[#9a83db]/40 rounded-full animate-[spin_12s_linear_infinite_reverse]" />

                                        <div className="p-3 rounded-xl border border-white/20 bg-black/60 backdrop-blur-md relative shadow-[0_10px_20px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.2)]">
                                            <Cpu className="w-6.5 h-6.5 text-[#00f2ff] animate-spin" style={{ animationDuration: '4s' }} />
                                        </div>
                                    </div>

                                    {/* Official Cyborg Logo instead of text (TranslateZ: 30px) */}
                                    <div className="flex flex-col items-center py-1" style={{ transform: 'translateZ(30px)' }}>
                                        <Image
                                            src="/cyborg_logo.png"
                                            alt="Cyborg Logo"
                                            width={150}
                                            height={50}
                                            className="h-[70px] w-auto object-contain transition-all duration-300 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] hover:scale-105"
                                            loading="eager"
                                        />
                                    </div>

                                    {/* Loader Progress Section (TranslateZ: 25px) */}
                                    <div className="w-full space-y-4 pt-4 border-t border-white/10" style={{ transform: 'translateZ(25px)' }}>
                                        <div className="flex justify-between items-center text-[9px] tracking-widest text-gray-400 font-mono uppercase font-bold">
                                            <span className="text-[#00f2ff] animate-pulse">
                                                {progress < 25 ? "INITIALIZING SYSTEMS..." :
                                                 progress < 55 ? "ESTABLISHING CORE LINK..." :
                                                 progress < 85 ? "LOADING CYBERNETICS..." :
                                                 progress < 98 ? "OPTIMIZING INTERFACE..." : "SYSTEM READY"}
                                            </span>
                                            <span className="text-gray-200 font-black">{progress.toFixed(0)}%</span>
                                        </div>

                                        {/* Progress Bar Container */}
                                        <div className="h-2.5 w-full bg-black/70 rounded-full overflow-hidden border border-white/10 p-[1px] relative shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.8)]">
                                            <motion.div
                                                className="h-full rounded-full bg-gradient-to-r from-[#9a83db] via-[#cfbdff] to-[#00f2ff] relative"
                                                style={{ width: `${progress}%` }}
                                                transition={{ ease: 'linear' }}
                                            >
                                                {/* Glowing Laser Tip */}
                                                {progress > 0 && (
                                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#00f2ff,0_0_3px_#fff]" />
                                                )}
                                            </motion.div>
                                        </div>

                                        {/* Diagnostic Technical Subtitles */}
                                        <div className="flex justify-between items-center text-[8px] font-mono text-gray-500 uppercase tracking-widest pt-1 select-none">
                                            <span>SECURE_BOOT: ACTIVE</span>
                                            <span>PORT: 0x8F9C</span>
                                            <span>SYS_VER: 2.0.4</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* RIGHT DIAGNOSTIC MODULE (Desktop only) */}
                            <motion.div
                                initial={{ opacity: 0, x: 35 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 35, transition: { duration: 0.4 } }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="hidden lg:flex pointer-events-auto flex-col w-64 bg-gradient-to-br from-[#00f2ff]/20 via-transparent to-[#9a83db]/30 p-[1.5px]"
                                style={{
                                    clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)',
                                    transformStyle: 'preserve-3d',
                                    perspective: '1000px'
                                }}
                            >
                                <div 
                                    className="bg-[#0b0a11]/85 backdrop-blur-2xl p-5 space-y-6 font-mono text-[10px] min-h-[350px] flex flex-col justify-between"
                                    style={{
                                        clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)'
                                    }}
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 border-b border-[#00f2ff]/25 pb-2 text-[#00f2ff] font-bold tracking-wider uppercase">
                                            <Terminal className="w-3.5 h-3.5 text-[#00f2ff]" />
                                            <span>PROCESS_STREAM</span>
                                        </div>

                                        <div className="space-y-2 text-[9px] text-gray-400 font-mono leading-relaxed h-[170px] overflow-hidden select-none">
                                            {progress > 5 && <div className="text-green-400/90">&gt; INIT_SYS: STAGE_01 ... OK</div>}
                                            {progress > 20 && <div className="text-gray-400">&gt; MOUNT: /dev/core_link ... SUCCESS</div>}
                                            {progress > 40 && <div className="text-[#00f2ff]/90">&gt; KEY_EXCHANGE: 1024-BIT AUTH</div>}
                                            {progress > 60 && <div className="text-[#cfbdff]/90">&gt; PARSING: CYBORG_DB [120 ENTRIES]</div>}
                                            {progress > 80 && <div className="text-amber-400/90">&gt; COMPILING: GRAPHICS ENGINE ...</div>}
                                            {progress >= 100 && <div className="text-green-400 font-bold">&gt; COMPLETED: INTERFACE READY</div>}
                                            
                                            {/* Blinking CLI cursor */}
                                            <div className="flex items-center gap-1 mt-1 text-[#00f2ff]">
                                                <span>&gt;</span>
                                                <span className="w-1.5 h-3 bg-[#00f2ff] animate-pulse" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-white/5 pt-3 flex justify-between items-center text-[8px] text-gray-500">
                                        <span>SYS_LOAD: {(10 + progress * 0.6).toFixed(0)}%</span>
                                        <span className="text-[#00f2ff]/75">PORT: 8080</span>
                                    </div>
                                </div>
                            </motion.div>

                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

