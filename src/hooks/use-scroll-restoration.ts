'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Saves and restores the scrollTop of a container div on route changes.
 * Attach the returned ref to the scrollable div.
 *
 * Works by:
 * - Saving scrollTop to sessionStorage keyed by pathname on every scroll event
 * - Restoring it (via rAF, after paint) whenever the pathname changes back to a saved key
 * - Resetting to 0 for paths that have never been scrolled
 */
export function useScrollRestoration<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const pathname = usePathname();

  // Restore position when pathname changes
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const saved = sessionStorage.getItem(`scroll:${pathname}`);

    // requestAnimationFrame waits for the new page content to paint
    // before jumping — prevents a flash at position 0 then scroll
    const frame = requestAnimationFrame(() => {
      if (!ref.current) return;
      ref.current.scrollTop = saved !== null ? parseInt(saved, 10) : 0;
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  // Persist position on scroll (passive, no performance cost)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const save = () =>
      sessionStorage.setItem(`scroll:${pathname}`, String(el.scrollTop));

    el.addEventListener('scroll', save, { passive: true });

    return () => {
      // Also save on cleanup so the position is captured at the moment
      // of navigation (before pathname state updates in the next effect)
      save();
      el.removeEventListener('scroll', save);
    };
  }, [pathname]);

  return ref;
}
