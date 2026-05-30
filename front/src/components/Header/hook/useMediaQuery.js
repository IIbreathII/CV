import { useState, useEffect } from 'react';

export const useMediaQuery = (query) => {
    const isSupported = typeof window !== 'undefined' && typeof window.matchMedia === 'function';

    const [matches, setMatches] = useState(() => {
        if (!isSupported) return false;
        return window.matchMedia(query).matches;
    });

    useEffect(() => {
        if (!isSupported) return;

        const media = window.matchMedia(query);
        const listener = (e) => setMatches(e.matches);

        // initialize in case query changed
        setMatches(media.matches);

        if (typeof media.addEventListener === 'function') {
            media.addEventListener('change', listener);
            return () => media.removeEventListener('change', listener);
        }

        // fallback for older browsers
        if (typeof media.addListener === 'function') {
            media.addListener(listener);
            return () => media.removeListener(listener);
        }

        return;
    }, [query, isSupported]);

    return matches;
};