import { useEffect, useState, useRef } from 'react';

export default function RoboticArmCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const elbowRef = useRef({ x: -100, y: -100 });
  const shoulderRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const [, setRenderTrigger] = useState(0);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = !!target.closest(
          'a, button, input, textarea, select, label, [role="button"], .neo-btn, .neo-card, .cursor-pointer'
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let animId: number;
    const animate = () => {
      const tx = targetRef.current.x;
      const ty = targetRef.current.y;

      const eLerp = 0.25;
      const desiredEx = tx - 35;
      const desiredEy = ty + 45;

      elbowRef.current.x += (desiredEx - elbowRef.current.x) * eLerp;
      elbowRef.current.y += (desiredEy - elbowRef.current.y) * eLerp;

      const sLerp = 0.15;
      const desiredSx = elbowRef.current.x - 45;
      const desiredSy = elbowRef.current.y + 55;

      shoulderRef.current.x += (desiredSx - shoulderRef.current.x) * sLerp;
      shoulderRef.current.y += (desiredSy - shoulderRef.current.y) * sLerp;

      setRenderTrigger(prev => prev + 1);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const wx = mousePos.x;
  const wy = mousePos.y;
  const ex = elbowRef.current.x;
  const ey = elbowRef.current.y;
  const sx = shoulderRef.current.x;
  const sy = shoulderRef.current.y;

  const clawAngle = isClicked ? 35 : isHovered ? 20 : 0;
  const mainColor = isHovered ? '#26a641' : '#cfbdff';

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <svg className="w-full h-full">
        <defs>
          <filter id="armGlowCyan" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="armGlowPurple" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="armLimbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#494551" />
            <stop offset="50%" stopColor="#2b2639" />
            <stop offset="100%" stopColor="#14121a" />
          </linearGradient>
        </defs>

        <line
          x1={sx}
          y1={sy}
          x2={ex}
          y2={ey}
          stroke="#1d1929"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <line
          x1={sx}
          y1={sy}
          x2={ex}
          y2={ey}
          stroke="url(#armLimbGrad)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1={sx + 6}
          y1={sy - 4}
          x2={ex + 6}
          y2={ey - 4}
          stroke={mainColor}
          strokeWidth="2"
          strokeDasharray="4 3"
          opacity="0.8"
        />

        <line
          x1={ex}
          y1={ey}
          x2={wx}
          y2={wy}
          stroke="#1d1929"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <line
          x1={ex}
          y1={ey}
          x2={wx}
          y2={wy}
          stroke="url(#armLimbGrad)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d={`M ${sx} ${sy} Q ${(sx + ex) / 2 + 10} ${(sy + ey) / 2 - 10}, ${ex} ${ey} T ${wx} ${wy}`}
          fill="none"
          stroke={isHovered ? '#26a641' : '#9a83db'}
          strokeWidth="1.5"
          strokeDasharray="3 2"
          opacity="0.9"
        />

        <g transform={`translate(${sx}, ${sy})`}>
          <circle r="9" fill="#14121a" stroke={mainColor} strokeWidth="2" />
          <circle r="4" fill={mainColor} filter="url(#armGlowPurple)" />
        </g>

        <g transform={`translate(${ex}, ${ey})`}>
          <circle r="7" fill="#1d1a28" stroke="#494551" strokeWidth="2" />
          <circle r="3" fill={mainColor} />
          <line x1="-5" y1="0" x2="5" y2="0" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
          <line x1="0" y1="-5" x2="0" y2="5" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
        </g>

        <g transform={`translate(${wx}, ${wy})`}>
          <circle r="5" fill="#171422" stroke={mainColor} strokeWidth="1.5" />
        </g>

        <g transform={`translate(${wx}, ${wy})`}>
          <circle
            r={isHovered ? '16' : '12'}
            fill="none"
            stroke={mainColor}
            strokeWidth="1"
            strokeDasharray="6 3"
            className="transition-all duration-200"
            opacity="0.75"
          />

          <circle
            r={isClicked ? '4' : '2'}
            fill={mainColor}
            filter={isHovered ? 'url(#armGlowCyan)' : 'url(#armGlowPurple)'}
            className="transition-all duration-150"
          />

          <g transform={`rotate(${-30 + clawAngle})`}>
            <path
              d="M -3 -8 L -10 -16 L -16 -12 L -8 -2"
              fill={mainColor}
              stroke="#14121a"
              strokeWidth="1"
            />
            <circle cx="-13" cy="-14" r="1.5" fill="#ffffff" />
          </g>

          <g transform={`rotate(${30 - clawAngle})`}>
            <path
              d="M 3 -8 L 10 -16 L 16 -12 L 8 -2"
              fill={mainColor}
              stroke="#14121a"
              strokeWidth="1"
            />
            <circle cx="13" cy="-14" r="1.5" fill="#ffffff" />
          </g>

          <g transform={`rotate(180)`}>
            <path
              d="M -2 -6 L 0 -12 L 2 -6 Z"
              fill={mainColor}
              opacity="0.7"
            />
          </g>

          <g transform="translate(18, 18)">
            <rect
              x="0"
              y="-10"
              width="68"
              height="16"
              rx="3"
              fill="rgba(15, 13, 21, 0.85)"
              stroke={isHovered ? 'rgba(38, 166, 65, 0.5)' : 'rgba(207, 189, 255, 0.3)'}
              strokeWidth="1"
            />
            <text
              x="5"
              y="1"
              fill={isHovered ? '#26a641' : '#cfbdff'}
              fontSize="8"
              fontFamily="monospace"
              fontWeight="bold"
              letterSpacing="0.5"
            >
              {isHovered ? 'LOCKED' : `${Math.round(wx)},${Math.round(wy)}`}
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
