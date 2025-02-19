/*
  Analytics - Data Scroll Tracker

  Scroll tracker determines if each tracked section needs to be sent to analytics.
  If the section reaches the threshold of 30% of viewport height then scroll event is fired.

  Usage Example:
    <div data-scroll-tracking="Trade-Header-Section"></div>
    
*/
import { useEffect } from 'react';
import { genericPushEvent } from '@/services/google-analytics';
import { DataScrollTrackerProps } from './types';

export function DataScrollTracker({ children }: DataScrollTrackerProps): any {
  useEffect(() => {
    const dataScrollTrackingList = document.querySelectorAll('[data-scroll-tracking]');

    const scrollTracker = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry: any) => {
          if (entry.isIntersecting) {
            genericPushEvent({
              event: 'ScrollDistance_Magic',
              eventCategoryMagic: 'Scroll Depth',
              eventActionMagic: 'Elements',
              eventLabelMagic: entry.target.dataset.scrollTracking,
              eventIndexMagic: entry.target.dataset.eleIndex,
              eventNonInteraction: true
            });

            scrollTracker.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -30% 0px' }
    );

    if (dataScrollTrackingList) {
      dataScrollTrackingList.forEach((ele, index) => {
        ele.setAttribute('data-ele-index', `${index + 1}`);
        scrollTracker.observe(ele);
      });
    }
    return () => {
      scrollTracker.disconnect();
    };
  }, []);

  return children;
}
