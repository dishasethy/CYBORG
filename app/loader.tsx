import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu } from 'lucide-react';
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

                        <motion.div
                            key="loader-brand-card"
                            initial={{ opacity: 1, scale: 0.9, rotateX: 0, rotateY: 0 }}
                            animate={{ 
                                rotateX: [4, -4, 4], 
                                rotateY: [-8, 8, -8],
                                y: [-6, 6, -6],
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
                            style={{
                                transformStyle: 'preserve-3d',
                                perspective: '1000px'
                            }}
                            className="pointer-events-auto relative flex flex-col items-center p-10 sm:p-14 rounded-[2rem] border border-white/15 bg-[#0b0a11]/45 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),_inset_0_-1px_1px_rgba(0,0,0,0.4),_0_25px_50px_-12px_rgba(0,0,0,0.7),_0_0_50px_rgba(0,242,255,0.15)] text-center max-w-lg w-full space-y-10 overflow-hidden"
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
                            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                                <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f2ff]/40 to-transparent absolute top-0 animate-[scan_4s_linear_infinite]" />
                            </div>

                            {/* Tech Corner Accents (Sharp HUD framing inside borders) */}
                            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#00f2ff]/80 pointer-events-none" style={{ transform: 'translateZ(10px)' }} />
                            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#00f2ff]/80 pointer-events-none" style={{ transform: 'translateZ(10px)' }} />
                            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#00f2ff]/80 pointer-events-none" style={{ transform: 'translateZ(10px)' }} />
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#00f2ff]/80 pointer-events-none" style={{ transform: 'translateZ(10px)' }} />

                            {/* Glowing CPU/Core Icon with Tech Rings (TranslateZ: 40px) */}
                            <div className="relative flex items-center justify-center h-24 w-24" style={{ transform: 'translateZ(40px)' }}>
                                <div className="absolute inset-0 bg-[#00f2ff]/25 blur-xl rounded-full w-24 h-24 animate-pulse" />
                                
                                {/* Concentric Tech Rings */}
                                <div className="absolute w-20 h-20 border border-dashed border-[#00f2ff]/30 rounded-full animate-[spin_8s_linear_infinite]" />
                                <div className="absolute w-[88px] h-[88px] border border-dotted border-[#9a83db]/40 rounded-full animate-[spin_12s_linear_infinite_reverse]" />

                                <div className="p-4 rounded-2xl border border-white/20 bg-black/60 backdrop-blur-md relative shadow-[0_10px_20px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.2)]">
                                    <Cpu className="w-8 h-8 text-[#00f2ff] animate-spin" style={{ animationDuration: '4s' }} />
                                </div>
                            </div>

                            {/* Official Cyborg Logo instead of text (TranslateZ: 30px) */}
                            <div className="flex flex-col items-center py-2" style={{ transform: 'translateZ(30px)' }}>
                                <Image
                                    src="/cyborg_logo.png"
                                    alt="Cyborg Logo"
                                    width={280}
                                    height={110}
                                    className="h-[85px] w-auto object-contain transition-all duration-300 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] hover:scale-105"
                                    priority
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
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

