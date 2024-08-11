import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import localFont from 'next/font/local';

const headingFont = localFont({
  src: '../public/fonts/CalSans-SemiBold.woff2',
});

const PulsingDot = () => (
  <div className="flex space-x-2 justify-center items-center">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.15}s`}}></div>
    ))}
  </div>
);

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <Image src="/logo.svg" alt="Logo" height={24} width={24} />
          <p className={cn('text-lg text-gray-800 ml-2', headingFont.className)}>
            MileStone
          </p>
        </div>

        <PulsingDot />

        <p className="mt-4 text-sm text-gray-500">
          Loading your milestones
        </p>
      </div>
    </div>
  );
};

export default Loading;