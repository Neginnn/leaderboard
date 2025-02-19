declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: string;
      ENVIRONMENT: string;
      HOST_NAME: string;
      CONTENTFUL_ENVIRONMENT_CONFIGS: any;
      GOOGLE_TAG_MANAGER_ID: string;
      GOOGLE_TAG_MANAGER_CONTAINER: string;
      SEGMENT_WRITE_KEY: string;
      SOA_API_URL: string;
      AFFILIATE_API_URL: string;
      STONKS_API_URL: string;
      VWO_ACCOUNT_ID: string;
      STATIC_REPO_FILES_PATH: string;
      REACT_APP_TMDB_API_KEY: string;
    }
  }
}

// -------------------------------------------------------------------
// note: If this file has no import/export statements, then convert
//       it into a module by adding an empty export statement.
// -------------------------------------------------------------------
export {};
