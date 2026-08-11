// ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0 });
      return;
    }

    let cancelled = false;
    let attempts = 0;
    const targetId = decodeURIComponent(hash.slice(1));
    const scrollToHash = () => {
      if (cancelled) return;
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      attempts += 1;
      if (attempts < 12) window.requestAnimationFrame(scrollToHash);
    };
    const frame = window.requestAnimationFrame(scrollToHash);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, [pathname, hash]);

  useEffect(() => {
    const repeatSameHashNavigation = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
      if (!anchor) return;
      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin || destination.pathname !== window.location.pathname || !destination.hash) return;
      const target = document.getElementById(decodeURIComponent(destination.hash.slice(1)));
      if (target) window.requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    };
    document.addEventListener('click', repeatSameHashNavigation);
    return () => document.removeEventListener('click', repeatSameHashNavigation);
  }, []);

  return null;
};

export default ScrollToTop;
