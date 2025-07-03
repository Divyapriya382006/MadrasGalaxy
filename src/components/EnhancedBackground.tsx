import React, { useEffect, useState } from 'react';
import { Star, Sparkles } from 'lucide-react';

const EnhancedBackground: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Background Stars */}
      {[...Array(100)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 4}s`,
          }}
        >
          <Star className="text-yellow-200 w-1 h-1" />
        </div>
      ))}

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={`particle-${particle.id}`}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-70"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Shooting Stars */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`shooting-star-${i}`}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
            animation: `shootingStar 8s linear infinite`,
            animationDelay: `${i * 3}s`,
          }}
        />
      ))}

      {/* Nebula Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent opacity-50" />
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent opacity-30" />
      
      {/* Pulsing Energy Orbs */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`orb-${i}`}
          className="absolute w-4 h-4 bg-blue-400/30 rounded-full"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + Math.sin(i) * 20}%`,
            animation: `pulse 4s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
            filter: 'blur(2px)',
          }}
        />
      ))}
    </div>
  );
};

export default EnhancedBackground;