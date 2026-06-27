"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VedTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // We use requestIdleCallback to ensure this doesn't block the main thread or impact Core Web Vitals
    const trackView = () => {
      try {
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pathname,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            screenResolution: `${window.screen.width}x${window.screen.height}`
          }),
          keepalive: true
        }).catch(() => {});
      } catch (e) {}
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(trackView);
    } else {
      setTimeout(trackView, 1000);
    }
  }, [pathname]);

  return null;
}
