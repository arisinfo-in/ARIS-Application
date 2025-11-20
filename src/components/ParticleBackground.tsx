import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  particleCount?: number;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ particleCount = 15 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles: Array<{
      element: HTMLDivElement;
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      particle.className = `particle ${i % 2 === 0 ? 'particle-reverse' : ''}`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.animationDuration = `${15 + Math.random() * 10}s`;

      containerRef.current.appendChild(particle);

      particles.push({
        element: particle,
        x,
        y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size,
      });
    }

    return () => {
      particles.forEach((p) => {
        if (p.element.parentNode) {
          p.element.parentNode.removeChild(p.element);
        }
      });
    };
  }, [particleCount]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleBackground;

