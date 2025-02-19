import { getAnalytics } from '@/services/segment';

export function useSegment() {
  const analytics = getAnalytics();
  // note: We can apply global settings or modifications here. Such as parsing page event names.

  return {
    track: async (...args: any) => {
      if (!analytics) return;
      // @ts-ignore
      return analytics.track(...args).catch(console.warn);
    },
    identify: async (...args: any) => {
      if (!analytics) return;

      return analytics.identify(...args).catch(console.warn);
    },
    reset: async () => {
      if (!analytics) return;
      return analytics.reset();
    },
    page: async (...args: any) => {
      if (!analytics) return;

      return analytics.page(...args).catch(console.warn);
    }
  };
}
