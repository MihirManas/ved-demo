"use client";

import { useRef, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: null as number | null, y: null as number | null, radius: 250, active: true };

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Disable cursor gravity if hovering over a UI card/slab
      if (target.closest('.rounded-\\[3rem\\], .rounded-3xl, .rounded-2xl, .backdrop-blur-sm, .backdrop-blur-md, .backdrop-blur-xl, button, a')) {
        mouse.active = false;
      } else {
        mouse.active = true;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
    };

    const handleMouseOut = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number; y: number; size: number; vx: number; vy: number; fx: number; fy: number; colorType: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 1.5;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.fx = 0;
        this.fy = 0;
        
        // 60% golden, 40% theme
        const rand = Math.random();
        if (rand < 0.6) this.colorType = 0;
        else if (rand < 0.8) this.colorType = 1;
        else this.colorType = 2;
      }

      draw() {
        const currentColors = themeRef.current === 'light'
          ? ['#E6C875', '#000000', '#555555']
          : ['#E6C875', '#ffffff', '#444444'];
        
        ctx!.fillStyle = currentColors[this.colorType];
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const numParticles = window.innerWidth < 768 ? 70 : 180;
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Reset forces
      for (let i = 0; i < particles.length; i++) {
        particles[i].fx = 0;
        particles[i].fy = 0;
      }

      // Calculate N-body interactions and draw lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particles[i].x;
          const dy = particles[j].y - particles[i].y;
          const distSq = dx * dx + dy * dy;
          
          if (distSq < 32400) { // 180px distance max
            const distance = Math.sqrt(distSq);
            if (distance === 0) continue;
            
            // Repulsion < 60px, Attraction 60-180px
            let forceMag = 0;
            if (distance < 60) {
              forceMag = -0.06 * (1 - distance / 60); // Push apart to avoid clustering
            } else {
              forceMag = 0.002 * (1 - (distance - 60) / 120); // Pull together to form constellations
            }

            const fx = (dx / distance) * forceMag;
            const fy = (dy / distance) * forceMag;

            particles[i].fx += fx;
            particles[i].fy += fy;
            particles[j].fx -= fx;
            particles[j].fy -= fy;

            // Draw line
            if (distance < 160) {
              ctx.beginPath();
              ctx.strokeStyle = themeRef.current === 'light'
                ? `rgba(0, 0, 0, ${0.15 - distance / 1066})`
                : `rgba(230, 200, 117, ${0.2 - distance / 800})`; // Golden constellation lines
              ctx.lineWidth = 0.6;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        // Apply ultra-weak cursor gravity (0.001% effect)
        if (mouse.active && mouse.x != null && mouse.y != null) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius && distance > 0) {
             const forceMag = 0.008 * (1 - distance / mouse.radius);
             particles[i].fx += (dx / distance) * forceMag;
             particles[i].fy += (dy / distance) * forceMag;
          }
        }
      }

      // Update positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Add friction
        p.vx = (p.vx + p.fx) * 0.95;
        p.vy = (p.vy + p.fy) * 0.95;

        // Base moderate movement if speed drops too low (prevent freezing)
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed < 0.1) {
            p.vx += (Math.random() - 0.5) * 0.05;
            p.vy += (Math.random() - 0.5) * 0.05;
        }
        
        // Max speed cap
        if (speed > 1.5) {
            p.vx = (p.vx / speed) * 1.5;
            p.vy = (p.vy / speed) * 1.5;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > canvas.width) {
          p.vx *= -1;
          p.x = Math.max(0, Math.min(p.x, canvas.width));
        }
        if (p.y < 0 || p.y > canvas.height) {
          p.vy *= -1;
          p.y = Math.max(0, Math.min(p.y, canvas.height));
        }

        p.draw();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full opacity-40 dark:opacity-70 pointer-events-none z-0"
    />
  );
}
