import { useEffect, useRef } from 'react';

export default function ParticleText() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, radius: 135 };
    let isMobile = false;

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      color: string;
      size: number;
      density: number;
      vx: number;
      vy: number;
      originalColor: string;

      constructor(x: number, y: number, color: string) {
        this.x = isMobile ? x : x + (Math.random() - 0.5) * 500;
        this.y = isMobile ? y : y + (Math.random() - 0.5) * 500;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 2.2 + 0.9;
        this.color = color;
        this.originalColor = color;
        this.density = (Math.random() * 24) + 12;
        this.vx = 0;
        this.vy = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        if (isMobile) {
          this.x = this.baseX;
          this.y = this.baseY;
          return;
        }

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.hypot(dx, dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);

          const spreadFactor = 4.2;
          const jitterX = (Math.random() - 0.5) * 8;
          const jitterY = (Math.random() - 0.5) * 8;
          const directionX = Math.cos(angle) * force * this.density * spreadFactor + jitterX;
          const directionY = Math.sin(angle) * force * this.density * spreadFactor + jitterY;

          this.vx -= directionX;
          this.vy -= directionY;

          this.color = 'rgba(0, 242, 255, 0.95)';
        } else {
          const dxBase = this.baseX - this.x;
          const dyBase = this.baseY - this.y;
          this.vx += dxBase * 0.07;
          this.vy += dyBase * 0.07;

          if (this.color !== this.originalColor) {
            this.color = this.originalColor;
          }
        }

        this.vx *= 0.86;
        this.vy *= 0.86;

        this.x += this.vx;
        this.y += this.vy;
      }
    }

    const init = () => {
      if (!canvas || !ctx) return;

      const width = containerRef.current?.clientWidth || window.innerWidth || 1000;
      isMobile = width < 640;
      const fontScale = width < 1200 ? 5.6 : 4.8;
      const fontSize = Math.min(200, Math.floor(width / fontScale));
      const height = width < 640 ? Math.max(140, Math.floor(fontSize * 1.8)) : 340;

      mouse.radius = width < 640 ? 60 : 135;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const oCtx = offscreen.getContext('2d');
      if (!oCtx) return;

      oCtx.fillStyle = '#ffffff';
      oCtx.font = `900 ${fontSize}px "Orbitron", sans-serif`;
      oCtx.textBaseline = 'middle';
      oCtx.textAlign = 'center';
      oCtx.fillText('CYBORG', width / 2, height / 2);

      const imgData = oCtx.getImageData(0, 0, width, height);
      particles = [];

      const step = fontSize > 65 ? 3 : 2;

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = imgData.data[index + 3];

          if (alpha > 120) {
            const rand = Math.random();
            let color = 'rgba(207, 189, 255, 0.75)';
            if (rand < 0.25) {
              color = 'rgba(0, 242, 255, 0.85)';
            } else if (rand < 0.5) {
              color = 'rgba(255, 255, 255, 0.9)';
            } else if (rand < 0.7) {
              color = 'rgba(154, 131, 219, 0.65)';
            }

            particles.push(new Particle(x, y, color));
          }
        }
      }
    };

    const resizeObserver = new ResizeObserver((entries) => {
      init();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    document.fonts.ready.then(() => {
      init();
    });

    init();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchend', handleMouseLeave);

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
        canvas.removeEventListener('touchend', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto flex justify-center items-center py-2 select-none relative">
      <div className="absolute inset-x-4 inset-y-0 bg-[#cfbdff]/5 blur-[80px] rounded-full pointer-events-none" />
      <canvas
        ref={canvasRef}
        className="cursor-crosshair relative z-10 transition-all duration-300 w-full"
      />
    </div>
  );
}
