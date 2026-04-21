import { useEffect } from 'react';

/**
 * Lock/unlock body scroll.
 * When locked = true, body gets overflow: hidden (scroll-locked class).
 */
export function useScrollLock(locked) {
  useEffect(() => {
    if (locked) {
      document.body.classList.add('scroll-locked');
    } else {
      document.body.classList.remove('scroll-locked');
    }

    return () => {
      document.body.classList.remove('scroll-locked');
    };
  }, [locked]);
}
