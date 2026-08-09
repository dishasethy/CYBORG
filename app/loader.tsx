import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Shield, Sparkles, Activity } from 'lucide-react';
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
    { text: 'ସାଇବର୍ଗ', lang: 'ODIA (ଓଡ଼ିଆ)', font: "'Space Grotesk', sans-serif", code: 'OD', color: '#ff9d00' },
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
    { text: 'CÍBORG', lang: 'SPANISH (Español)', font: "'Space Grotesk', sans-serif", code: 'ES', color: '#fbbf24' },
    { text: 'সাইবর্গ', lang: 'BENGALI (বাংলা)', font: "'Space Grotesk', sans-serif", code: 'BN', color: '#34d399' },
    { text: 'CYBORG', lang: 'SAC NIT ROURKELA', font: "'Orbitron', sans-serif", code: 'NITR', color: '#ffdc16ff' },
];

export default function Loader({ onComplete, durationMs = 1800 }: LoaderProps) {
    const [progress, setProgress] = useState<number>(0);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

    useEffect(() => {
        const startTime = Date.now();

        // 1. Progress Timer over total duration (e.g. 3000ms)
        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const currentProgress = Math.min((elapsed / durationMs) * 100, 100);
            setProgress(currentProgress);

            if (elapsed >= durationMs) {
                clearInterval(progressInterval);
                setIsFadingOut(true);
                setTimeout(() => {
                    onComplete?.();
                }, 600);
            }
        }, 16);

        // 2. Rapid Language Switcher
        const switchInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const pct = elapsed / durationMs;

            if (pct > 0.85) {
                setCurrentIndex(0);
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
                    className="fixed inset-0 z-[9999] bg-[#09080e] text-white flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none overflow-hidden font-qwigley"
                >
                    {/* Tactical Background Grid & Radial Glow */}
                    <div className="absolute inset-0 pointer-events-none opacity-20 hud-grid" />
                    <div
                        className="absolute inset-0 pointer-events-none opacity-30 transition-all duration-300"
                        style={{
                            background: `radial-gradient(circle at 50% 50%, ${currentItem.color}15 0%, transparent 70%)`
                        }}
                    />



                    {/* TOP HEADER: Telemetry & Status */}
                    <div className="relative z-10 flex items-center justify-between text-base sm:text-lg text-[#948e9c] font-qwigley">
                        <div className="flex items-center gap-3">
                            <div className="neo-btn p-2 rounded-xl text-[#00F2FF]">
                                <Cpu className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white font-bold tracking-wider text-xl sm:text-2xl uppercase font-qwigley">
                                    Cyborg System Bootloader
                                </span>
                                <span className="text-base text-[#00F2FF] font-qwigley">
                                    SAC // NIT Rourkela Core
                                </span>
                            </div>
                        </div>

                        {/* Language Code Pill */}
                        <div className="flex items-center gap-2 neo-inset px-3 py-1.5 rounded-full border border-[#494551]/30">
                            <span className="w-2 h-2 rounded-full bg-[#00F2FF] animate-ping" />
                            <span className="text-base font-bold text-[#00F2FF] uppercase tracking-widest font-qwigley">
                                Lang: {currentItem.code}
                            </span>
                        </div>

                        {/* Frame rate / Protocol tag */}
                        <div className="hidden sm:flex items-center gap-2 text-base uppercase font-bold text-[#948e9c] font-qwigley">
                            <Shield className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Quantum Neural Kernel 6.2</span>
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
                                        className="text-6xl sm:text-8xl md:text-9xl lg:text-10xl tracking-tight leading-none drop-shadow-[0_0_35px_rgba(0,242,255,0.4)] font-qwigley"
                                        style={{
                                            color: currentItem.color,
                                            textShadow: `0 0 40px ${currentItem.color}80`,
                                        }}
                                    >
                                        {currentItem.text}
                                    </h1>

                                    {/* Language Script Tag Subtitle */}
                                    <div className="mt-6 flex items-center gap-2 bg-[#141218]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#494551]/50 shadow-lg">
                                        <Sparkles className="w-3.5 h-3.5" style={{ color: currentItem.color }} />
                                        <span className="font-qwigley" style={{ color: currentItem.color }}>{currentItem.lang}</span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* BOTTOM SECTION: Progress Bar & Percentage Counter */}
                    <div className="relative z-10 space-y-4 max-w-4xl mx-auto w-full">
                        <div className="flex items-center justify-between text-base font-bold text-[#948e9c] px-1 font-qwigley">
                            <div className="flex items-center gap-2">
                                <Activity className="w-3.5 h-3.5 text-[#00F2FF]" />
                                <span className="text-white uppercase tracking-wider font-qwigley">
                                    {progress < 85 ? 'Initializing Neural Networks...' : 'Boot Complete // Launching Main Frame'}
                                </span>
                            </div>
                            <div className="text-right text-2xl text-[#00F2FF] font-black tracking-widest font-qwigley">
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
                        <div className="flex flex-wrap items-center justify-between text-base text-[#948e9c] pt-1 font-qwigley">
                            <span>NIT Rourkela Robotics Division</span>
                            <span className="hidden sm:inline">Cyborg High-Speed Load Protocol</span>
                            <span>Est. Time: {(((durationMs - (progress * (durationMs / 100)))) / 1000).toFixed(1)}s</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
