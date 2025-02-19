import { useEffect, useState } from 'react';
import { useMediaQuery as useRrMediaQuery } from 'react-responsive';
import { mediaQueries } from '@/styles/mediaQueries';

const { mobileOnly, mediumOnly, largeOnly, xlargeOnly } = mediaQueries.device;

// -------------------------------------------------------------------
// important: Caution! Anything rendered by this hook will be
//            rendered on the client side. This mean the content
//            cannot be parsed by bots.
// -------------------------------------------------------------------
export default function useMediaQuery() {
  const isMobile = useRrMediaQuery({ query: mobileOnly });
  const isTablet = useRrMediaQuery({ query: mediumOnly });
  const isLaptop = useRrMediaQuery({ query: largeOnly });
  const isDesktop = useRrMediaQuery({ query: xlargeOnly });
  const isTabletOrSquare = useRrMediaQuery({ query: '(max-aspect-ratio: 3/2)' });
  const isPortrait = useRrMediaQuery({ query: '(orientation: portrait)' });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true);
  }, []);

  if (!isClient) return null;

  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    isPortrait,
    isTabletOrSquare
  };
}
