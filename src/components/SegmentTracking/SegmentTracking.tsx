import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSegment } from '@/hooks/useSegment';
import { initSegment } from '@/services/segment';

// -------------------------------------------------------------------
// important: If events are not registering in Segment, confirm if
//            you have any ad blocking software enabled. If so,
//            disabled it or add localhost and segment to your local
//            allow-list.
// -------------------------------------------------------------------
export function SegmentTracking() {
  const { events } = useRouter();
  const { page } = useSegment();

  useEffect(() => initSegment(), []);

  useEffect(() => {
    const handleRouteChangeComplete = (pathname: string) => {
      // console.log(`🚦 Route changed: "${pathname}"`);
      page(pathname);
    };

    events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => events.off('routeChangeComplete', handleRouteChangeComplete);
  }, [events, page]);

  return null;
}
