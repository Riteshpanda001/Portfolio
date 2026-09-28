import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors';
  const variants = {
    default: 'bg-[#6C63FF]/15 text-[#6C63FF] border border-[#6C63FF]/30',
    mint: 'bg-[#00E5C3]/15 text-[#00E5C3] border border-[#00E5C3]/30',
    outline: 'border border-slate-700 text-slate-300',
  };

  return (
    <span className={`${baseClasses} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
