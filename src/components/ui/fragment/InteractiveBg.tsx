import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function InteractiveBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollData = useRef({ y: 0, velocity: 0, progress: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Particle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      color: string;
      shape: 'circle' | 'square' | 'hex';
      pulse: number;
      pulseSpeed: number;
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(80, Math.floor((width * height) / 20000));

    for (let i = 0; i < particleCount; i++) {
      const z = i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1;
      const baseRadius = z === 3 ? 2.5 : z === 2 ? 1.8 : 1.0;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * (height * 2.5),
        z,
        vx: (Math.random() - 0.5) * (0.2 * z),
        vy: (Math.random() - 0.5) * (0.2 * z),
        radius: baseRadius,
        baseRadius,
        color: z === 3 ? 'rgba(0, 242, 255, 0.65)' : z === 2 ? 'rgba(207, 189, 255, 0.45)' : 'rgba(154, 131, 219, 0.25)',
        shape: i % 7 === 0 ? 'hex' : i % 5 === 0 ? 'square' : 'circle',
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollData.current.y = self.scroll();
        scrollData.current.velocity = self.getVelocity() * 0.001;
        scrollData.current.progress = self.progress;
      },
    });

    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, radius: 180 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let scrollYOffset = 0;
    let gridOffset = 0;

    const draw = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const targetScroll = scrollData.current.y;
      scrollYOffset += (targetScroll - scrollYOffset) * 0.1;
      const scrollVelocity = scrollData.current.velocity;

      gridOffset = (scrollYOffset * 0.3) % 40;

      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#09080e';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = `rgba(207, 189, 255, ${0.015 + Math.min(0.025, Math.abs(scrollVelocity) * 0.005)})`;
      ctx.lineWidth = 1;

      const gridSize = 40;
      const parallaxMouseX = (mouse.x - width / 2) * 0.02;
      const parallaxMouseY = (mouse.y - height / 2) * 0.02;

      for (let x = (parallaxMouseX % gridSize); x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = (-gridOffset + parallaxMouseY) % gridSize; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const orb1X = width * 0.2 + (mouse.x - width / 2) * 0.05;
      const orb1Y = height * 0.3 - (scrollYOffset * 0.15) % height + (mouse.y - height / 2) * 0.05;

      const orbGrad1 = ctx.createRadialGradient(orb1X, orb1Y, 10, orb1X, orb1Y, 350);
      orbGrad1.addColorStop(0, `rgba(0, 242, 255, ${0.04 + Math.min(0.04, Math.abs(scrollVelocity) * 0.01)})`);
      orbGrad1.addColorStop(0.6, 'rgba(154, 131, 219, 0.015)');
      orbGrad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = orbGrad1;
      ctx.beginPath();
      ctx.arc(orb1X, orb1Y, 350, 0, Math.PI * 2);
      ctx.fill();

      const orb2X = width * 0.8 + (mouse.x - width / 2) * 0.08;
      const orb2Y = height * 0.7 - (scrollYOffset * 0.25) % height + (mouse.y - height / 2) * 0.08;

      const orbGrad2 = ctx.createRadialGradient(orb2X, orb2Y, 10, orb2X, orb2Y, 400);
      orbGrad2.addColorStop(0, 'rgba(207, 189, 255, 0.035)');
      orbGrad2.addColorStop(0.7, 'rgba(0, 242, 255, 0.01)');
      orbGrad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = orbGrad2;
      ctx.beginPath();
      ctx.arc(orb2X, orb2Y, 400, 0, Math.PI * 2);
      ctx.fill();

      particles.forEach((p, idx) => {
        const depthFactor = p.z === 3 ? 0.35 : p.z === 2 ? 0.2 : 0.08;
        const rawY = (p.y - scrollYOffset * depthFactor) % (height + 120);
        const renderY = rawY < -60 ? rawY + height + 120 : rawY;

        const mouseParallaxX = (mouse.x - width / 2) * (0.012 * p.z);
        const renderX = (p.x + mouseParallaxX + width) % width;

        p.x += p.vx;
        p.y += p.vy;

        p.pulse += p.pulseSpeed;
        p.radius = p.baseRadius + Math.sin(p.pulse) * 0.4;

        const stretchY = Math.min(10, Math.abs(scrollVelocity) * p.z * 1.2);

        ctx.fillStyle = p.color;
        ctx.beginPath();

        if (p.shape === 'square') {
          ctx.rect(renderX - p.radius, renderY - p.radius, p.radius * 2, p.radius * 2 + stretchY);
        } else if (p.shape === 'hex') {
          const r = p.radius + 1;
          for (let k = 0; k < 6; k++) {
            const angle = (k * Math.PI) / 3;
            const hx = renderX + r * Math.cos(angle);
            const hy = renderY + r * Math.sin(angle);
            if (k === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
        } else {
          ctx.arc(renderX, renderY, p.radius, 0, Math.PI * 2);
        }
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (p2.z === p.z) {
            const p2RawY = (p2.y - scrollYOffset * depthFactor) % (height + 120);
            const p2RenderY = p2RawY < -60 ? p2RawY + height + 120 : p2RawY;
            const p2RenderX = (p2.x + (mouse.x - width / 2) * (0.012 * p2.z) + width) % width;

            const dist = Math.hypot(renderX - p2RenderX, renderY - p2RenderY);
            if (dist < 110) {
              const alpha = (1 - dist / 110) * (p.z === 3 ? 0.14 : 0.07);
              ctx.strokeStyle = `rgba(207, 189, 255, ${alpha})`;
              ctx.lineWidth = p.z === 3 ? 0.75 : 0.4;
              ctx.beginPath();
              ctx.moveTo(renderX, renderY);
              ctx.lineTo(p2RenderX, p2RenderY);
              ctx.stroke();
            }
          }
        }
      });

      const spotGrad = ctx.createRadialGradient(mouse.x, mouse.y, 5, mouse.x, mouse.y, mouse.radius);
      spotGrad.addColorStop(0, 'rgba(0, 242, 255, 0.03)');
      spotGrad.addColorStop(0.5, 'rgba(154, 131, 219, 0.01)');
      spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = spotGrad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      st.kill();
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
