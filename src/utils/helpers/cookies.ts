import { isEnvironment } from '@/utils/helpers/environment';

// -------------------------------------------------------------------
// note: This function will set a cookie based on the given value.
//       daysToExpiration can either be a number or 'session'. A value
//       of 0 will delete the cookie.
// -------------------------------------------------------------------
export const setCookie = (
  name: string,
  value: string,
  { daysToExpiration, path = '/' }: { daysToExpiration: number | 'session'; path?: string }
): void => {
  const isProduction = isEnvironment('prod');
  const cookieValues = `${name}=${value}; path=${path}; ${isProduction ? 'Secure' : ''};`;

  if (daysToExpiration === 'session') {
    document.cookie = cookieValues;
  } else {
    const date = new Date();

    date.setTime(date.getTime() + daysToExpiration * 24 * 60 * 60 * 1000);
    const expiryDate = date.toUTCString();

    document.cookie = `${cookieValues} expires=${expiryDate};`;
  }
};

// note: This function returns a cookie value based on the given name.
export const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  const cookiesValues = document.cookie.split(';');

  for (let i = 0; i < cookiesValues.length; i++) {
    let cookieValue = cookiesValues[i];

    while (cookieValue.charAt(0) === ' ') {
      cookieValue = cookieValue.substring(1, cookieValue.length);
    }
    if (cookieValue.indexOf(nameEQ) === 0) {
      return cookieValue.substring(nameEQ.length, cookieValue.length);
    }
  }
  return null;
};
