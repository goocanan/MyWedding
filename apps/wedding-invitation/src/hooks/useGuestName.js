import { useMemo } from 'react';

/**
 * Reads the `?to=` URL parameter to get the guest name.
 * Falls back to "Tamu Undangan" if not provided.
 */
export function useGuestName() {
  const guestName = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('to');
    return name ? decodeURIComponent(name) : 'Tamu Undangan';
  }, []);

  return guestName;
}
