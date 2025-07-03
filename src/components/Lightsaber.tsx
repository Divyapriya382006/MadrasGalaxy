import React from 'react';

interface LightsaberProps {
  side: 'left' | 'right';
}

const Lightsaber: React.FC<LightsaberProps> = ({ side }) => {
  const isLeft = side === 'left';
  
  return (
    <div 
      className={`fixed top-1/2 ${isLeft ? 'left-8' : 'right-8'} transform -translate-y-1/2 z-0 hidden lg:block`}
      style={{
        animation: `float 4s ease-in-out infinite ${isLeft ? '' : '2s'}`,
      }}
    >
      <div className="relative">
        {/* Lightsaber Handle */}
        <div className={`w-4 h-32 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full shadow-lg ${isLeft ? 'rotate-12' : '-rotate-12'}`}>
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-gray-300 rounded"></div>
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-gray-300 rounded"></div>
        </div>
        
        {/* Lightsaber Blade */}
        <div 
          className={`absolute ${isLeft ? '-top-64' : '-top-64'} left-1/2 transform -translate-x-1/2 w-1 h-64 ${isLeft ? 'rotate-12' : '-rotate-12'}`}
          style={{
            background: `linear-gradient(to top, ${isLeft ? '#3B82F6' : '#EF4444'}, transparent)`,
            boxShadow: `0 0 20px ${isLeft ? '#3B82F6' : '#EF4444'}, 0 0 40px ${isLeft ? '#3B82F6' : '#EF4444'}`,
            animation: `glow 2s ease-in-out infinite alternate`,
          }}
        >
          <div 
            className="absolute inset-0 w-full h-full rounded-full"
            style={{
              background: `linear-gradient(to top, ${isLeft ? '#60A5FA' : '#F87171'}, transparent)`,
              filter: 'blur(2px)',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Lightsaber;