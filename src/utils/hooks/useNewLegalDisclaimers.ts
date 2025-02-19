// @ts-nocheck
import { useEffect, useState } from 'react';
import {
  indexArrayContentByKey,
  getLegalDisclaimer,
  appendSupContainer
} from '@/helpers/disclaimers';
import { contentfulClient } from '@/services/contentful';

/*
  useDisclaimers is used for retrieving the list of legal disclaimers array and can be independently 
  used for displaying the disclaimer any where required.
  
  Mandatory Props: 
  legalDisclaimerKeys or pageDOMNode
    In order for the hook to retrieve the list fo legal disclaimers we need to provide either 
    legalDisclaimerKeys array or pageDOMNode that has `data-attr-disclaimer-key` attribute attached to it 
    on child the html tags

  Optional Props:
  contentfulDisclaimerData: 
    contentfulDisclaimerData Object can be passed as props while calling the component, 
    if not available then the component will hame contentful client call to retrieve the object by itself.
*/

function useNewLegalDisclaimers(legalDisclaimerKeys, pageDOMNode, contentfulDisclaimerData) {
  const [disclaimerData, setDisclaimerData] = useState();

  useEffect(() => {
    if (pageDOMNode && contentfulDisclaimerData) {
      const disclaimersArray = appendSupContainer(pageDOMNode, contentfulDisclaimerData);

      if (disclaimersArray?.length) setDisclaimerData(disclaimersArray);
    } else if (legalDisclaimerKeys && contentfulDisclaimerData) {
      const disclaimersArray = getLegalDisclaimer(legalDisclaimerKeys, contentfulDisclaimerData);

      setDisclaimerData(disclaimersArray);
    } else if (
      (legalDisclaimerKeys && !contentfulDisclaimerData) ||
      (pageDOMNode && !contentfulDisclaimerData)
    ) {
      (async () => {
        const appSpaceContent = contentfulClient('app');

        const query = {
          content_type: 'legalDisclaimer'
        };

        const pageDisclaimerData = await appSpaceContent?.getEntries(null, query);

        const contentfulData = indexArrayContentByKey(pageDisclaimerData.items);

        if (legalDisclaimerKeys && !contentfulDisclaimerData) {
          const disclaimersArray = getLegalDisclaimer(legalDisclaimerKeys, contentfulData);

          setDisclaimerData(disclaimersArray);
        }
        if (pageDOMNode && !contentfulDisclaimerData) {
          const disclaimersArray = appendSupContainer(pageDOMNode, contentfulData);

          setDisclaimerData(disclaimersArray);
        }
      })();
    }
  }, []);
  return disclaimerData;
}

export default useNewLegalDisclaimers;
