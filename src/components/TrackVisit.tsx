"use client";

import { useEffect, useRef } from 'react';

export default function TrackVisit() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    // Fire and forget fetch to our background tracking endpoint
    fetch('/api/track', { method: 'POST' }).catch(() => {
      // Silently ignore tracking errors to not disrupt user experience
    });
  }, []);

  return null;
}
