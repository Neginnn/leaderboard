import { RefObject } from 'react';

export const indexArrayContentByKey = (pageDisclaimerData: any) => {
  return pageDisclaimerData?.reduce((total: any, nextItem: any) => {
    const legalItemKey = nextItem?.fields?.key;
    const defaultLocale = nextItem?.fields.province === 'default';

    if (!total[legalItemKey] && defaultLocale) {
      // eslint-disable-next-line no-param-reassign
      total[legalItemKey] = nextItem?.fields;
    }
    return total;
  }, {});
};

/*
  getLegalDisclaimer method returns Disclaimers List Array from Disclaimer Keys Array, 
  contentfulDisclaimerData Object that is passed as input
*/

export const getLegalDisclaimer = (arr: string[], contentfulDisclaimerData: any) => {
  let textStr: string = '';
  const array: string[] = [];

  for (let i = 0; i < arr?.length; i++) {
    let key = arr[i].trim();

    while (key.charAt(0) === ' ') {
      key = key.substring(1, key.length);
    }

    if (key.split(',').length > 1) {
      const keyArr = key.split(',');
      const combinedArr = getLegalDisclaimer(keyArr, contentfulDisclaimerData);

      textStr = combinedArr.join(' ');
    }

    if (!key.includes(',') && contentfulDisclaimerData) {
      if (!contentfulDisclaimerData[key]) {
        console.warn(`Cannot find legal disclaimer key ${key}`);
      } else {
        textStr = contentfulDisclaimerData[key]?.disclaimerCopy;
      }
    }

    array.push(textStr);
  }

  return array;
};

/*
  appendSupContainer methods takes ref and contentfulDisclaimerData as input props 
  and looks for the data-attr-disclaimer-key and builds a Disclaimer Keys Array. 
  Now when the disclaimer Keys Array is available this method in turn call the getLegalDisclaimer method.
*/

export const appendSupContainer = (ref: RefObject<any>, contentfulDisclaimerData: any) => {
  if (ref && ref.current instanceof HTMLElement) {
    const disclaimerElements = ref.current.querySelectorAll('[data-attr-disclaimer-key]');
    const disclaimerKeyArr: string[] = [];

    disclaimerElements.forEach((item: any, index: number) => {
      const order = index + 1;
      const supContainer = document.createElement('sup');

      supContainer.innerHTML = `${order}`;
      const disclaimerKey = item.getAttribute('data-attr-disclaimer-key');

      disclaimerKeyArr.push(disclaimerKey);
      item.appendChild(supContainer);
    });

    if (disclaimerKeyArr && contentfulDisclaimerData) {
      return getLegalDisclaimer(disclaimerKeyArr, contentfulDisclaimerData);
    }
  }
  console.warn('No Referenced passed for Disclaimers hook to parse');
  return undefined;
};
