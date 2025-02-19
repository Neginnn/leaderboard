const nodeConfig = require("config");

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  console.log(">>>>>>>> APP_ENV " + nodeConfig.get("nodeConfigEnv"));
  console.log(">>>>>>>> ENVIRONMENT " + nodeConfig.get("nodeEnv"));
  console.log(">>>>>>>> COMMIT_ID " + process.env.COMMIT_ID);
  // doc: https://nextjs.org/docs/api-reference/next.config.js/environment-variables
  const env = {
    APP_ENV: nodeConfig.get("nodeConfigEnv"), // local|qa|dev|demo|training|staging|prod https://nextjs.org/docs/messages/non-standard-node-env
    ENVIRONMENT: nodeConfig.get("nodeEnv"), // production|development|test  important: Cannot use reserved key "NODE_ENV" or "NODE_ENVIRONMENT"
    HOST_NAME: nodeConfig.get("hostName"),
  };

  /* 
    NextJS is running multiple instances on the server for load balance, it will run into 404 error 
    when trying to fetch the buildManifest.js file. 
    For multi server deploys we need to ensure same build ID is used across replicated servers
  */
  let BUILD_ID = process.env.COMMIT_ID;

  if (env.ENVIRONMENT === "development") {
    BUILD_ID = "local-build";
  }

  if (!BUILD_ID) {
    console.log("BUILD FAILURE, no build id found");
    process.exit(1);
  }

  return {
    reactStrictMode: false, // note: Double render in development an intentional feature of React v18. https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#react
    images: { domains: ["localhost", "images.ctfassets.net"] }, // note: append to list of domains when referencing external images.
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });

      return config;
    },
    env, // doc:
    generateBuildId: async () => {
      return BUILD_ID;
    },
    async rewrites() {
      return [
        {
          source: "/:path*",
          has: [
            { type: "header", key: "Accept", value: "application/vnd.mogo.v2" },
          ],
          destination: process.env.API_URL
            ? `${process.env.API_URL}/:path*`
            : "http://localhost:4000/:path*",
        },
      ];
    },

    compiler: {
      // need this below config to pass css emotions props to html elements
      emotion: {
        // doc: https://nextjs.org/docs/advanced-features/compiler#emotion
        sourceMap: env.APP_ENV === "local",
        autoLabel: env.APP_ENV === "local" ? "always" : "never",
        labelFormat: "[dirname]",
      },
    },
    i18n: {
      // doc: https://nextjs.org/docs/advanced-features/i18n-routing
      locales: ["en-CA", "fr"],
      defaultLocale: "en-CA",
      // turn redirect off for homepage
      localeDetection: false,
    },
  };
};

module.exports = nextConfig;
