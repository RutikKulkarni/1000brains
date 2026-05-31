"use client";

import { useEffect, useState } from "react";

interface UseAnimatedCounterOptions {
  end: number;
  duration?: number; // ms
  start?: number;
  enabled?: boolean;
}

/**
 * Animates a number from `start` to `end` over `duration` ms.
 * Used for the Global Impact Counter on the home page.
 */
export function useAnimatedCounter({
  end,
  duration = 2000,
  start = 0,
  enabled = true,
}: UseAnimatedCounterOptions): number {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!enabled) {
      setCount(start);
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + (end - start) * eased));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start, enabled]);

  return count;
}
