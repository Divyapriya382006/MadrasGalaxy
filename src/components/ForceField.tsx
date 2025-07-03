import React from 'react';

interface ForceFieldProps {
  children: React.ReactNode;
  className?: string;
}

const ForceField: React.FC<ForceFieldProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Force Field Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-lg animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-400/5 to-transparent rounded-lg" />
      
      {/* Holographic Border */}
      <div className="absolute inset-0 rounded-lg border border-blue-400/30 shadow-lg shadow-blue-400/20" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-400 rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-400 rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-400 rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-400 rounded-br-lg" />
    </div>
  );
};

export default ForceField;