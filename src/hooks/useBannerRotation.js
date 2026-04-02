import { useState, useEffect } from 'react';
import { BANNER_INTERVAL } from '../constants';

/**
 * Rotates a banner index on a timer.
 * Previously duplicated in Categories.jsx and Specials.jsx.
 *
 * @param {number} totalBanners — number of banners
 * @param {number} [intervalMs] — override interval (defaults to BANNER_INTERVAL)
 * @returns {number} currentBanner — the active banner index
 */
export default function useBannerRotation(totalBanners, intervalMs = BANNER_INTERVAL) {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % totalBanners);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [totalBanners, intervalMs]);

  return currentBanner;
}
