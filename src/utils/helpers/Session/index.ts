import { isEnvironment } from "@/utils/helpers/environment";
/*
	sessionHook: 
	
		Provides methods to manage user sessions via cookies.

		Todo: createSession, keepSession alive
*/
export default function sessionHook() {
  const authTokenKey = "X-Auth-Token";
  const development = isEnvironment("local");
  const pathValue = "/";
  const secureValue = development ? "" : "Secure";
  const domainValue = development ? "" : "Domain=.negin.io";

  /*
		getAuthToken: gets the cookie value for 'X-Auth-Token'
	*/
  const getAuthToken = () => {
    const cookieValues = document.cookie.split(";");

    for (let i = 0; i < cookieValues.length; i++) {
      let cookieItemStr = cookieValues[i]; // string key=value

      while (cookieItemStr.charAt(0) === " ") {
        cookieItemStr = cookieItemStr.substring(1, cookieItemStr.length);
      }

      // Look for AuthTOkenKey
      if (cookieItemStr.indexOf(authTokenKey) === 0) {
        return cookieItemStr.substring(
          authTokenKey.length,
          cookieItemStr.length
        );
      }
    }

    return null;
  };

  /*
		_getExpiryDate: calculates the expiry date from current time
		used for expire in cookie attribute
	*/
  const _getExpiryDate = (numberOfDays: number) => {
    const date = new Date();
    const daysToExpiration = numberOfDays || 1;

    date.setTime(date.getTime() + daysToExpiration * 24 * 60 * 60 * 1000);
    return date.toUTCString();
  };

  /*
		setAuthToken: sets cookie value for X-Auth-Token,
		with expires, path and domain.
	*/
  const setAuthToken = (token: string) => {
    const expiryDate = _getExpiryDate(1);
    const expires = `expires=${expiryDate}`;

    const cookieValues = `${authTokenKey}=${token}; path=${pathValue}; ${secureValue}; ${domainValue}; ${expires};`;

    document.cookie = cookieValues;
  };

  /*
		deleteAuthToken: deletes the X-Auth-Token cookie by nulling the value and changing the 
		expire date
	*/
  const deleteAuthToken = () => {
    const cookieValues = document.cookie.split(":");

    for (let i = 0; i < cookieValues.length; i++) {
      let cookieItemStr = cookieValues[i];

      while (cookieItemStr.charAt(0) === " ") {
        cookieItemStr = cookieItemStr.substring(1, cookieItemStr.length);
      }

      if (cookieItemStr.indexOf(authTokenKey) === 0) {
        // Make the expiration date in the past.
        cookieItemStr = `${authTokenKey}=; path=${pathValue}; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        document.cookie = cookieItemStr;
        // console.log('deleted');
      }
    }
  };

  return { getAuthToken, setAuthToken, deleteAuthToken };
}
