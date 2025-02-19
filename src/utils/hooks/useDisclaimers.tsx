import React, { RefObject, useEffect, useState } from 'react';
import { contentfulClient } from '@/services/contentful';

export default function useDisclaimers() {
  const [disclaimersContentfulList, setDisclaimersContentfulList] = useState<any>([]);
  const [disclaimerKeys, setDisclaimerKey] = useState<string[]>([]);
  const [disclaimersList, setDisclaimerStrings] = useState<string[]>([]);

  // TODO: LegalDisclaimer list also makes the same call. Consolidate code and call it
  // in one area only. Get list on Mount:
  useEffect(() => {
    (async () => {
      // APP Space
      const appSpaceContent = contentfulClient('app');
      // just getting disclaimers data from app space by content_type
      const query = {
        content_type: 'legalDisclaimer'
      };

      const pageDisclaimerData: any = await appSpaceContent?.getEntries(null, query);
      const contentfulDisclaimerData: any = indexArrayContentByKey(pageDisclaimerData.items);

      setDisclaimersContentfulList(contentfulDisclaimerData);
    })();
  }, []);

  // When the contentful disclaimer list is ready, retrieve list of keys to be rendered
  // and build disclaimer list
  useEffect(() => {
    if (disclaimerKeys.length) {
      setDisclaimerStrings(getLegalDisclaimer(disclaimerKeys));
    }
  }, [disclaimersContentfulList]);

  const indexArrayContentByKey = (pageDisclaimerData: any[]) => {
    return pageDisclaimerData.reduce((total, nextItem) => {
      const currentTotal = total;
      const legalItemKey = nextItem?.fields?.key;
      const defaultLocale = nextItem?.fields.province === 'default';

      if (!currentTotal[legalItemKey] && defaultLocale)
        currentTotal[legalItemKey] = nextItem.fields;

      return currentTotal;
    }, {});
  };

  const getLegalDisclaimer = (arr: string[]): any => {
    const array: string[] = [];
    let textStr: string = '';

    for (let i = 0; i < arr.length; i++) {
      let key: any = arr[i].trim();

      while (key.charAt(0) === ' ') {
        key = key.substring(1, key.length);
      }

      if (key.split(',').length > 1) {
        const keyArr = key.split(',');
        const combinedArr = getLegalDisclaimer(keyArr);

        textStr = combinedArr.join(' ');
      }
      if (!key.includes(',')) {
        if (!disclaimersContentfulList[key]) {
          console.warn(`Cannot find legal disclaimer key ${key}`);
        } else {
          textStr = disclaimersContentfulList[key]?.disclaimerCopy;
        }
      }

      array.push(textStr);
    }

    return array;
  };

  const appendSupContainer = (ref: RefObject<any>) => {
    if (ref && ref.current instanceof HTMLElement) {
      const disclaimerElems = ref.current.querySelectorAll('[data-attr-disclaimer-key]');
      const disClaimerKeyArr: any[] = [];

      disclaimerElems.forEach((item, index) => {
        const order = index + 1;
        const supContainer = document.createElement('sup');

        supContainer.innerHTML = `${order}`;
        const disclaimerKey = item.getAttribute('data-attr-disclaimer-key');

        disClaimerKeyArr.push(disclaimerKey);
        item.appendChild(supContainer);
      });
      setDisclaimerKey(disClaimerKeyArr);
    } else {
      console.warn('No Referenced passed for Disclaimers hook to parse');
    }
  };

  return {
    disclaimersContentfulList,
    disclaimerKeys,
    disclaimersList,
    getLegalDisclaimer,
    appendSupContainer
  };
}
