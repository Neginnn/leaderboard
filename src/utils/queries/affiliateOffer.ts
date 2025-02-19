import getConfig from 'next/config';
import mockOffer from '@/utils/mocks/mockAffiliatesOffersData.json';
/*
	getAffiliateOffer: Post request for signup.

	getAffiliateOffer is technically an unauthenticated call BUT it needs a 
	bearer token.

  !!!! IMPORTANT !!!! Bearer tokens are from vaults which cannot be accessed locally
  Steps to have bearer token or variables set up locally
  1) add .env.local file in root
  2) add AFFILIATE_BEARER_TOKEN="BEARER TOKEN STRING"
  3) you can use this variable anywhere via the command process.env.AFFILIATE_BEARER_TOKEN
  https://nextjs.org/docs/basic-features/environment-variables

*/

export const getServerSideAffiliateOffer = async (affiliate_code: string, test_mode: any) => {
  const { serverRuntimeConfig } = getConfig();
  const affiliateId = affiliate_code;
  const url = `${process.env.AFFILIATE_API_URL}/affiliates/offers?affiliate_code=${affiliateId}`;

  // by pass redirect and use mock response
  // cannot use mock api because that path is not white listed in the helms
  if (test_mode) {
    return mockOffer;
  }

  const bearer = serverRuntimeConfig.SECRET_AFFILIATE_BEARER_TOKEN || '';
  const headerOptions = {
    headers: {
      Authorization: bearer,
      'Content-Type': 'application/json'
    }
  };

  const response = await fetch(url, headerOptions);

  // throw custom error for use query `onError`;
  if (response.status === 200) return response.json();
  throw await response.json();
};
