import React from 'react';
import './BubbleBackground.css';

export default function BubbleBackground() {
  // Generate an array of bubbles with random properties
  const bubbles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 60 + 20, // 20px to 80px
    left: Math.random() * 100, // 0% to 100%
    duration: Math.random() * 15 + 10, // 10s to 25s
    delay: Math.random() * 10, // 0s to 10s
    opacity: Math.random() * 0.3 + 0.1, // 0.1 to 0.4
  }));

  return (
    <div className="bubble-container fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble absolute rounded-full border border-white/20"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            bottom: '-100px',
            opacity: bubble.opacity,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
            boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.2)',
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1), transparent)',
          }}
        />
      ))}
    </div>
  );
}
