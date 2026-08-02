import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Terminal, Shield, Zap, Sparkles, Activity } from 'lucide-react';

interface LoaderProps {
    onComplete?: () => void;
    durationMs?: number;
}

interface LanguageWord {
    text: string;
    lang: string;
    font: string;
    code: string;
    color: string;
}

const CYBORG_LANGUAGES: LanguageWord[] = [
    { text: 'CYBORG', lang: 'ENGLISH (CORE)', font: "'Orbitron', sans-serif", code: 'EN', color: '#00F2FF' },
    { text: 'サイボーグ', lang: 'JAPANESE (日本語)', font: "'Noto Sans JP', sans-serif", code: 'JA', color: '#cfbdff' },
    { text: 'साइबॉर्ग', lang: 'HINDI (हिन्दी)', font: "'Noto Sans Devanagari', sans-serif", code: 'HI', color: '#f59e0b' },
    { text: 'КИБОРГ', lang: 'RUSSIAN (Русский)', font: "'Space Grotesk', sans-serif", code: 'RU', color: '#10b981' },
    { text: 'سايبورغ', lang: 'ARABIC (العربية)', font: "'Noto Sans Arabic', sans-serif", code: 'AR', color: '#3b82f6' },
    { text: '사이버그', lang: 'KOREAN (한국어)', font: "'Noto Sans KR', sans-serif", code: 'KO', color: '#ec4899' },
    { text: '赛博格', lang: 'CHINESE (中文)', font: "'Noto Sans SC', sans-serif", code: 'ZH', color: '#ef4444' },
    { text: 'ΚΥΒΟΡΓΙΟ', lang: 'GREEK (Ελληνικά)', font: "'Syne', sans-serif", code: 'EL', color: '#a855f7' },
    { text: '01000011 01011001', lang: 'BINARY PROTOCOL', font: "'Share Tech Mono', monospace", code: 'BIN', color: '#00F2FF' },
    { text: '0x43 0x59 0x42 0x4F', lang: 'HEX KERNEL', font: "'JetBrains Mono', monospace", code: 'HEX', color: '#cfbdff' },
    { text: 'C¥BØR6', lang: 'CYBER GLITCH', font: "'Rubik Glitch', cursive", code: 'GLT', color: '#f43f5e' },
    { text: '[ CYBORG.AI ]', lang: 'NEURAL MATRIX', font: "'VT323', monospace", code: 'VT', color: '#00F2FF' },
    { text: 'CÍBORG', lang: 'SPANISH (Español)', font: "'Space Grotesk', sans-serif", code: 'ES', color: '#fbbf24' },
    { text: 'সাইবর্গ', lang: 'BENGALI (বাংলা)', font: "'Space Grotesk', sans-serif", code: 'BN', color: '#34d399' },
    { text: 'CYBORG', lang: 'SAC NIT ROURKELA', font: "'Orbitron', sans-serif", code: 'NITR', color: '#00F2FF' },
];

export default function Loader({ onComplete, durationMs = 3000 }: LoaderProps) {
    const [progress, setProgress] = useState<number>(0);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

    useEffect(() => {
        const startTime = Date.now();

        // 1. Progress Timer over total duration (e.g. 5000ms)
        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const currentProgress = Math.min((elapsed / durationMs) * 100, 100);
            setProgress(currentProgress);

            if (elapsed >= durationMs) {
                clearInterval(progressInterval);
                setIsFadingOut(true);
                setTimeout(() => {
                    onComplete?.();
                }, 600); // smooth exit animation duration
            }
        }, 16);

        // 2. Rapid Language Switcher (Speedy cycling every 90ms until 85% progress)
        const switchInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const pct = elapsed / durationMs;

            // When near the end (>85%), lock onto the primary CYBORG logo
            if (pct > 0.85) {
                setCurrentIndex(0); // Primary English / Orbitron CYBORG
            } else {
                setCurrentIndex((prev) => (prev + 1) % CYBORG_LANGUAGES.length);
            }
        }, 90);

        return () => {
            clearInterval(progressInterval);
            clearInterval(switchInterval);
        };
    }, [durationMs, onComplete]);

    const currentItem = CYBORG_LANGUAGES[currentIndex];

    return (
        <AnimatePresence>
            {!isFadingOut && (
                <motion.div
                    key="cyborg-loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(12px)' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[9999] bg-[#09080e] text-white flex flex-col justify-between p-6 sm:p-10 md:p-14 font-sans select-none overflow-hidden"
                >
                    {/* Tactical Background Grid & Radial Glow */}
                    <div className="absolute inset-0 pointer-events-none opacity-20 hud-grid" />
                    <div
                        className="absolute inset-0 pointer-events-none opacity-30 transition-all duration-300"
                        style={{
                            background: `radial-gradient(circle at 50% 50%, ${currentItem.color}15 0%, transparent 70%)`
                        }}
                    />

                    {/* Laser Scanner Line */}
                    <div className="scan-line" />

                    {/* TOP HEADER: Telemetry & Status */}
                    <div className="relative z-10 flex items-center justify-between font-mono text-xs text-[#948e9c]">
                        <div className="flex items-center gap-3">
                            <div className="neo-btn p-2 rounded-xl text-[#00F2FF]">
                                <Cpu className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white font-bold tracking-wider text-[11px] uppercase">
                                    CYBORG SYSTEM BOOTLOADER
                                </span>
                                <span className="text-[9px] text-[#00F2FF]">
                                    SAC // NIT ROURKELA CORE
                                </span>
                            </div>
                        </div>

                        {/* Language Code Pill */}
                        <div className="flex items-center gap-2 neo-inset px-3 py-1.5 rounded-full border border-[#494551]/30">
                            <span className="w-2 h-2 rounded-full bg-[#00F2FF] animate-ping" />
                            <span className="text-[10px] font-bold text-[#00F2FF] uppercase tracking-widest">
                                LANG_SCRIPT: {currentItem.code}
                            </span>
                        </div>

                        {/* Frame rate / Protocol tag */}
                        <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase font-bold text-[#948e9c]">
                            <Shield className="w-3.5 h-3.5 text-emerald-400" />
                            <span>QUANTUM NEURAL KERNEL 6.2</span>
                        </div>
                    </div>

                    {/* CENTER DISPLAY: Rapidly Changing Language Text */}
                    <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-12 px-4">
                        {/* Audio Visualizer Waves */}
                        <div className="flex items-center gap-1 mb-8 opacity-60">
                            {[40, 75, 30, 90, 60, 100, 45, 80, 35, 95, 50, 85].map((height, i) => (
                                <motion.div
                                    key={i}
                                    className="w-1 bg-[#00F2FF] rounded-full"
                                    animate={{ height: [`${height * 0.3}%`, `${height}%`, `${height * 0.4}%`] }}
                                    transition={{
                                        duration: 0.4,
                                        repeat: Infinity,
                                        repeatType: 'reverse',
                                        delay: i * 0.03,
                                    }}
                                    style={{ height: `${height}px`, maxHeight: '36px' }}
                                />
                            ))}
                        </div>

                        {/* Speedy Language Text Box */}
                        <div className="min-h-[140px] md:min-h-[180px] flex items-center justify-center w-full relative">
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0.2, scale: 0.9, y: 10, filter: 'blur(8px)' }}
                                    animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, scale: 1.1, y: -10, filter: 'blur(8px)' }}
                                    transition={{ duration: 0.08, ease: 'easeOut' }}
                                    className="flex flex-col items-center justify-center"
                                >
                                    <h1
                                        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none uppercase drop-shadow-[0_0_35px_rgba(0,242,255,0.4)]"
                                        style={{
                                            fontFamily: currentItem.font,
                                            color: currentItem.color,
                                            textShadow: `0 0 40px ${currentItem.color}80`,
                                        }}
                                    >
                                        {currentItem.text}
                                    </h1>

                                    {/* Language Script Tag Subtitle */}
                                    <div className="mt-6 flex items-center gap-2 font-mono text-xs sm:text-sm font-bold tracking-widest text-[#e6e1e9] bg-[#141218]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#494551]/50 shadow-lg">
                                        <Sparkles className="w-3.5 h-3.5" style={{ color: currentItem.color }} />
                                        <span style={{ color: currentItem.color }}>{currentItem.lang}</span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* BOTTOM SECTION: Progress Bar & Percentage Counter */}
                    <div className="relative z-10 space-y-4 max-w-4xl mx-auto w-full">
                        <div className="flex items-center justify-between font-mono text-xs font-bold text-[#948e9c] px-1">
                            <div className="flex items-center gap-2">
                                <Activity className="w-3.5 h-3.5 text-[#00F2FF]" />
                                <span className="text-white uppercase tracking-wider">
                                    {progress < 85 ? 'INITIALIZING NEURAL NETWORKS...' : 'BOOT COMPLETE // LAUNCHING MAIN FRAME'}
                                </span>
                            </div>
                            <div className="text-right text-base font-cyber text-[#00F2FF] font-black tracking-widest">
                                {progress.toFixed(1)}%
                            </div>
                        </div>

                        {/* Glowing Custom Progress Bar */}
                        <div className="relative h-3 w-full bg-[#14111d] rounded-full overflow-hidden p-0.5 border border-[#494551]/50 neo-inset">
                            <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-[#9a83db] via-[#00F2FF] to-[#cfbdff] shadow-[0_0_15px_#00F2FF]"
                                style={{ width: `${progress}%` }}
                                transition={{ ease: 'linear' }}
                            />
                        </div>

                        {/* Telemetry Footer Info */}
                        <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-[#948e9c] pt-1">
                            <span>NIT ROURKELA ROBOTICS DIVISION</span>
                            <span className="hidden sm:inline">5000MS HIGH-SPEED CYBORG LOAD PROTOCOL</span>
                            <span>EST. TIME: {((5000 - (progress * 50)) / 1000).toFixed(1)}s</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
