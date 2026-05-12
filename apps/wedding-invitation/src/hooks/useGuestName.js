import { useMemo } from 'react';

const DEFAULT_GUEST_NAME = 'Tamu Undangan';

/**
 * Reads the `?to=` URL parameter to get the guest name.
 * - Automatically decodes URL-encoded characters (e.g. %20 → space)
 * - Falls back to "Tamu Undangan" if the parameter is missing or empty
 * - Trims whitespace and sanitizes the input
 */
export function useGuestName() {
  const guestName = useMemo(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const rawName = params.get('to'); // URLSearchParams auto-decodes

      if (!rawName) return DEFAULT_GUEST_NAME;

      // Trim and collapse excessive whitespace
      const cleaned = rawName.trim().replace(/\s+/g, ' ');

      return cleaned || DEFAULT_GUEST_NAME;
    } catch {
      return DEFAULT_GUEST_NAME;
    }
  }, []);

  return guestName;
}
