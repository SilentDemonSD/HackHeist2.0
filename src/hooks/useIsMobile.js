import { useState, useEffect } from 'react';

const MQ = '(max-width: 768px)';

/**
 * Detects mobile viewports via matchMedia.
 * The initial state is resolved synchronously (safe for CSR).
 */
export default function useIsMobile() {
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MQ).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(MQ);
    const handler = (e) => setMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return mobile;
}
