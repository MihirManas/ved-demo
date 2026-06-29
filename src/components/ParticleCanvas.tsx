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
    // Mouse has tiny mass representing 0.0001% influence compared to heavy particle clusters
    const mouse = { x: null as number | null, y: null as number | null, mass: 0.05 }; 

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
      initParticles();
    };

    class Particle {
      x: number; y: number; size: number; vx: number; vy: number; mass: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 2.0; // Increased size: 2.0px to 4.5px
        this.vx = (Math.random() - 0.5) * 1.0; 
        this.vy = (Math.random() - 0.5) * 1.0;
        this.mass = this.size; // Mass proportional to visual size
      }

      update() {
        // Micro-gravity towards cursor
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distSq = dx * dx + dy * dy;
          const distance = Math.sqrt(distSq);
          
          if (distance > 5 && distance < 300) {
            const force = (0.5 * mouse.mass) / (distSq + 50);
            this.vx += (dx / distance) * force;
            this.vy += (dy / distance) * force;
          }
        }

        // Apply friction/damping to prevent infinite speeds and keep it "moderate"
        this.vx *= 0.94;
        this.vy *= 0.94;

        // Soft velocity clamp to prevent slingshot glitches
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const maxSpeed = 1.8;
        if (speed > maxSpeed) {
          this.vx = (this.vx / speed) * maxSpeed;
          this.vy = (this.vy / speed) * maxSpeed;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Elastic bounce off walls to keep particles in frame
        if (this.x < 0 || this.x > canvas.width) {
          this.vx *= -0.8;
          this.x = Math.max(0, Math.min(this.x, canvas.width));
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.vy *= -0.8;
          this.y = Math.max(0, Math.min(this.y, canvas.height));
        }
      }

      draw() {
        // Dominant Golden color
        ctx!.fillStyle = '#E6C875';
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      // Significantly decreased amount for aesthetic & O(n^2) performance
      const numParticles = window.innerWidth < 768 ? 50 : 120;
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update physics for all particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Calculate N-body gravity with every other particle
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distSq = dx * dx + dy * dy;
          const distance = Math.sqrt(distSq);

          // Connection lines for the constellation aesthetic
          if (distance < 160) {
            ctx.beginPath();
            const opacity = 1 - (distance / 160);
            
            // Theme wise black or white connecting network
            ctx.strokeStyle = themeRef.current === 'light'
              ? `rgba(0, 0, 0, ${opacity * 0.15})`
              : `rgba(255, 255, 255, ${opacity * 0.15})`;
              
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }

          // N-Body Gravity calculation
          if (distance > 0 && distance < 250) {
            // Gravitational constant G (tuned for aesthetics)
            const G = 0.8;
            
            // Softened gravity F = G / (r^2 + softening)
            let force = G / (distSq + 200);
            
            // Short-range repulsion to prevent singular black holes
            if (distance < 30) {
                force -= (30 - distance) * 0.002;
            }
            
            const ax = (dx / distance) * force;
            const ay = (dy / distance) * force;
            
            // Newton's 3rd law: Equal and opposite forces
            // Acceleration is inversely proportional to own mass, so we multiply by the *other* particle's mass
            p1.vx += ax * p2.mass;
            p1.vy += ay * p2.mass;
            
            p2.vx -= ax * p1.mass;
            p2.vy -= ay * p1.mass;
          }
        }
        
        p1.update();
        p1.draw();
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
      className="fixed top-0 left-0 w-full h-full opacity-60 dark:opacity-80 pointer-events-none z-0"
    />
  );
}
