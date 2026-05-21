'use client';

export const SectionDivider = () => {
  return (
    <div className="relative h-24 w-full overflow-hidden bg-gradient-to-b from-primary-navy to-primary-navy-dark">
      {/* Animated particles */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="h-32 w-32 animate-pulse-glow rounded-full bg-primary-cyan blur-3xl"></div>
      </div>
      
      {/* Dividing line */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-primary-blue to-transparent"></div>
    </div>
  );
};
