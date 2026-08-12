import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu } from 'lucide-react';

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

    const doorTransition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };

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
                            initial={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ 
                                opacity: 0, 
                                scale: 1.5, 
                                filter: 'blur(20px)',
                                y: -50
                            }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="pointer-events-auto relative flex flex-col items-center p-8 sm:p-12 rounded-3xl border border-[#2f2b3e]/60 bg-[#0b0a11]/70 backdrop-blur-xl shadow-2xl text-center max-w-md w-full space-y-8"
                        >
                            {/* Glowing CPU/Core Icon */}
                            <div className="relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-gray-500/10 blur-2xl rounded-full w-20 h-20 animate-pulse" />
                                <div className="p-4 rounded-2xl border border-gray-600/30 bg-black/40 backdrop-blur-md relative shadow-inner">
                                    <Cpu className="w-8 h-8 text-gray-300 animate-spin" style={{ animationDuration: '6s' }} />
                                </div>
                            </div>

                            {/* Minimal Identity */}
                            <div className="space-y-2">
                                <h1 className="font-cyber font-black text-4xl tracking-[0.4em] text-white uppercase ml-[0.4em] drop-shadow-[0_0_12px_rgba(255,255,255,0.1)]">
                                    CYBORG
                                </h1>
                            </div>

                            {/* Loader Progress Section */}
                            <div className="w-full space-y-3 pt-4 border-t border-[#2f2b3e]/60">
                                <div className="flex justify-between items-center text-[10px] tracking-widest text-gray-400 font-mono uppercase font-bold">
                                    <span>SYSTEM START</span>
                                    <span className="text-gray-200 font-black">{progress.toFixed(0)}%</span>
                                </div>

                                {/* Progress Bar Container */}
                                <div className="h-1 w-full bg-black/50 rounded-full overflow-hidden border border-[#2f2b3e]/60">
                                    <motion.div
                                        className="h-full rounded-full bg-gradient-to-r from-gray-700 via-gray-400 to-gray-200 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                                        style={{ width: `${progress}%` }}
                                        transition={{ ease: 'linear' }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

