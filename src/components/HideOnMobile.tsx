'use client';

import React, { useEffect, useState } from 'react';

type HideOnMobileProps = {
  children: React.ReactNode;
  minWidth?: number; // pixels
};

export default function HideOnMobile({ children, minWidth = 769 }: HideOnMobileProps) {
  const [isClient, setIsClient] = useState(false);
  const [isWide, setIsWide] = useState<boolean>(true);

  useEffect(() => {
    setIsClient(true);
    const update = () => setIsWide(window.innerWidth >= minWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [minWidth]);

  if (!isClient) {
    // SSR: default to showing (desktop) to avoid layout shift on hydration for wide screens
    return null;
  }

  if (!isWide) return null;
  return <>{children}</>;
}


