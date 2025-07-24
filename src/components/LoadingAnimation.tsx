'use client';

import { useState, useEffect, useRef } from 'react';

interface LoadingAnimationProps {
  children: React.ReactNode;
}

export default function LoadingAnimation({ children }: LoadingAnimationProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnded = () => {
      // Start fade out transition
      setIsFadingOut(true);
      
      // After fade out completes, hide the overlay completely
      setTimeout(() => {
        setIsLoading(false);
      }, 1300); // 1300ms fade out duration
    };

    // Auto play the video when component mounts
    video.addEventListener('ended', handleVideoEnded);
    video.play().catch(console.error);

    return () => {
      video.removeEventListener('ended', handleVideoEnded);
    };
  }, []);

  return (
    <>
      {/* Loading Animation Overlay */}
      {isLoading && (
        <div 
          className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-2000 ease-out ${
            isFadingOut ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <video
            ref={videoRef}
            className="max-h-[400px] w-auto"
            muted
            playsInline
            preload="auto"
            style={{
              maxHeight: '400px',
              height: 'auto',
              width: 'auto'
            }}
          >
            <source src="/0724.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {/* Main Content - render directly without wrapper to preserve layout */}
      {children}
    </>
  );
} 