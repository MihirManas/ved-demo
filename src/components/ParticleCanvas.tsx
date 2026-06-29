"use client";

import { useRef, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);

  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: null as number | null, y: null as number | null, radius: 180 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    const initParticles = () => {
      particles = [];
      // Decreased amount of particles
      const numParticles = window.innerWidth < 768 ? 40 : 100;
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number; colorType: number; mass: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Increased size
        this.size = Math.random() * 3.0 + 2.0;
        this.speedX = 0;
        this.speedY = 0;
        // Make golden dominant (70% chance)
        const rand = Math.random();
        this.colorType = rand > 0.3 ? 0 : (rand > 0.15 ? 1 : 2);
        // Mass proportional to size
        this.mass = this.size * 2;
      }

      update() {
        // Gravity towards cursor (cursor mass is 0.0001% of average particle mass)
        // Average particle mass is around 7 (size 3.5 * 2)
        // Cursor mass = 7 * 0.000001 = 0.000007
        const cursorMass = 0.000007;
        const G = 0.5; // Gravitational constant for the simulation

        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distanceSq = dx * dx + dy * dy;
          const distance = Math.sqrt(distanceSq);

          // Add a minimum distance to prevent infinite forces
          if (distance > 5) {
             const force = (G * this.mass * cursorMass) / distanceSq;
             const forceX = force * (dx / distance);
             const forceY = force * (dy / distance);
             
             // F = ma -> a = F/m
             this.speedX += forceX / this.mass;
             this.speedY += forceY / this.mass;
          }
        }

        // Apply slight friction
        this.speedX *= 0.99;
        this.speedY *= 0.99;

        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX *= -1;
          this.x = Math.max(0, Math.min(this.x, canvas.width));
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.speedY *= -1;
          this.y = Math.max(0, Math.min(this.y, canvas.height));
        }
      }

      draw() {
        // 0: Gold, 1: Theme Dark/Light, 2: Theme Muted
        const currentColors = themeRef.current === 'light'
          ? ['#E6C875', '#000000', '#555555']
          : ['#E6C875', '#ffffff', '#444444'];
        
        ctx!.fillStyle = currentColors[this.colorType];
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const G = 0.05; // Gravity between particles

      for (let i = 0; i < particles.length; i++) {
        // Calculate gravity from all other particles
        for (let j = 0; j < particles.length; j++) {
           if (i === j) continue;
           const dx = particles[j].x - particles[i].x;
           const dy = particles[j].y - particles[i].y;
           const distanceSq = dx * dx + dy * dy;
           const distance = Math.sqrt(distanceSq);

           // Apply gravity only if they are relatively close to form patterns, but not too close
           if (distance > 10 && distance < 150) {
              const force = (G * particles[i].mass * particles[j].mass) / distanceSq;
              const forceX = force * (dx / distance);
              const forceY = force * (dy / distance);
              
              particles[i].speedX += forceX / particles[i].mass;
              particles[i].speedY += forceY / particles[i].mass;
           }
        }

        particles[i].update();
        particles[i].draw();

        // Draw connecting lines based on distance and mass to emphasize patterns
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Increased connection distance for more pattern visibility with fewer particles
          if (distance < 120) {
            ctx.beginPath();
            
            // Highlight connections involving gold particles
            const isGoldConnection = particles[i].colorType === 0 || particles[j].colorType === 0;
            const alpha = isGoldConnection ? (0.3 - distance / 400) : (0.15 - distance / 800);
            
            ctx.strokeStyle = themeRef.current === 'light'
              ? (isGoldConnection ? `rgba(230, 200, 117, ${alpha})` : `rgba(0, 0, 0, ${alpha * 0.5})`)
              : (isGoldConnection ? `rgba(230, 200, 117, ${alpha})` : `rgba(255, 255, 255, ${alpha * 0.5})`);
              
            // Thicker lines for heavier particle connections
            ctx.lineWidth = (particles[i].mass + particles[j].mass) * 0.05;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
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
