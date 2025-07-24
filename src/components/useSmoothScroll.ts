// hooks/useSmoothScroll.ts
'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

// This hook applies a smooth scroll effect to a specific element.
export function useSmoothScroll(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    // If the ref is not attached to an element, do nothing.
    if (!ref.current) return;

    // The 'wrapper' is our scrollable element.
    // Lenis will handle finding the 'content' automatically.
    const lenis = new Lenis({
      wrapper: ref.current,
      lerp: 0.1,
      duration: 1.2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup function to destroy the Lenis instance when the component unmounts.
    return () => {
      lenis.destroy();
    };
  }, [ref]); // Rerun the effect if the ref changes.
}