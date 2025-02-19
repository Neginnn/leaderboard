import { Analytics, AnalyticsBrowser } from '@segment/analytics-next';

let analytics: Analytics | null = null;

export const initSegment = () => {
  const { pathname } = window.location;
  const writeKey = process.env.SEGMENT_WRITE_KEY;

  if (!writeKey) return console.warn('❌ Segment write key not detected.');

  AnalyticsBrowser.standalone(writeKey)
    .then((response) => {
      analytics = response;
      // console.log('🔬 Initialized Segment');
      analytics.page(pathname); // note: This page event triggers on initial page load.
      // console.log(`🏁 Initial page tracked: "${pathname}"`);
    })
    .catch(console.warn);
};

export const getAnalytics = () => {
  return analytics;
};
