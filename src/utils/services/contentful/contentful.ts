import * as contentful from "contentful";
import type {
  ContentfulClientConfig,
  SpaceNames,
  CommonComponentNames,
} from "./types";

/*
  contentfulClient

  instantiates a contentful client via contentful SDK. (contentful npm package)
  Adds an wrapper to client sdk methods to control the data.

  contentfulClient is a custom method that can be used on both client and server (i.e. on get static props).
  the service will automatically retrieve the correct variables correlated to process.env.APP_ENV

  PARAMS:
    [spaceName][required]: Contentful app space name

  *******************************************
  This FILE also includes some helper methods:

  parseAssetFile

  findItemByName

  indexArrayContent
*/

export function contentfulClient(spaceName: SpaceNames) {
  if (!spaceName) {
    console.warn("Contentful Service Error: must provide a space name");
    return;
  }

  const spaceParams = getSpaceParams(spaceName);

  const contentfulClientConfig: ContentfulClientConfig = {
    space: spaceParams.spaceId,
    accessToken: spaceParams.accessToken,
    host: spaceParams.host,
  };

  const client = contentful.createClient(contentfulClientConfig);

  function getSpaceParams(spaceName: string) {
    const contentfulConfigsObj = process.env.CONTENTFUL_ENVIRONMENT_CONFIGS; // configs directory
    const environment = process.env.APP_ENV;

    let contentfulSpaceEnvironment: any;

    // If production, always use production configs and never in preview
    // *** IMPORTANT *** there's no preview for the app space. (legal disclaimers)
    if (environment === "prod") {
      contentfulSpaceEnvironment = contentfulConfigsObj.production;
    } else {
      // Preview API: when this is true, add host to client config object:
      // https://github.com/contentful/contentful.js#using-this-library-with-the-preview-api
      contentfulSpaceEnvironment = contentfulConfigsObj.preview;
      contentfulSpaceEnvironment[spaceName].host = "preview.contentful.com";
    }

    if (!contentfulSpaceEnvironment[spaceName]) {
      console.warn(
        "Contentful Service Error: cannot find params from space name"
      );
      return "";
    }

    return contentfulSpaceEnvironment[spaceName];
  }

  const getEntry = async (contentId: string) => {
    const entry = await client
      .getEntry(contentId, { include: 5 })
      .then((data) => data)
      .catch((err) => console.log(err));

    return entry;
  };

  /*
    getEntries queries contentful with content ID and query obj
      queryObj[optional]: object that will be spread to the get entries config obj
    
    INCLUDE: Specify the depth of the resolved tree
    LIMIT: By default contentful only returns only the first 100 items in the array.
    The maximum number of entries returned by the API is 1000. The API will throw a BadRequestError for values higher than 1000

    DOCUMENTATION:
    https://contentful.github.io/contentful.js/contentful/9.1.18/ContentfulClientAPI.html#.getEntries

    */
  const getEntries = async (contentId: string | null, queryObj?: any) => {
    const entries = await client
      .getEntries({
        ...queryObj, // For getting disclaimer data we need to use content_type and this line is for getting it in the component
        "sys.id": contentId,
        include: 5,
        limit: 1000,
      })
      .then((data) => data)
      .catch((err) => console.log(err));

    return entries;
  };

  // Note: not too useful after entry
  const getAsset = async (assetId: string) => {
    let response;

    try {
      response = await client.getAsset(assetId);
    } catch (e: unknown) {
      if (e instanceof Error) {
        const errorMessage = JSON.parse(e.message);

        response = `Contentful: Get Asset Error ${errorMessage.statusText} for id ${errorMessage.details.id}`;
        // console.log({ response });
      }
    }

    return response;
  };

  return { getEntry, getAsset, getEntries };
}

/*
  Helper methods, not part of the contentfulClient class
*/

/*
  parseAssetFile

  Returns the file obj in the contentful node via field name. 

  Params: 
    [contentfulNode: Obj][required]: Field Object
    [fieldName: string][required]

  Usage:
    FOO: {fields: {mobile1x: fields: {title: 'marquee-m', description: '', file: {…}}}
    parseAssetFile(FOO, 'mobile1x') 
    returns file: {}
*/
export const parseAssetFile = (contentfulNode: any, fieldName: string) => {
  if (!contentfulNode.fields[fieldName])
    console.warn(`useContentful - parseAssetFile: no ${fieldName} name in obj`);
  return contentfulNode.fields[fieldName]
    ? contentfulNode.fields[fieldName].fields.file
    : "";
};

/*
  findItemByName

  Returns the obj in the contentful node via name
  
  Params: 
    [contentfulNode: obj || arr][required]: Object OR Array
    [name: string][required]

  Usage:
    FOO: {fields: {mobile1x: fields: {title: 'marquee-m', description: '', file: {…}}}
    findItemByName(FOO, 'mobile1x') 
    returns mobile1x
*/
export const findItemByName = (contentfulNode: any, name: string) => {
  let result = {};

  if (Array.isArray(contentfulNode)) {
    result = contentfulNode.find((item) => item.fields.name === name);
  } else if (
    typeof contentfulNode === "object" &&
    Object.keys(contentfulNode).length > 0
  ) {
    result = contentfulNode[name];
  } else {
    console.log("contentfulClient: findItemByName");
  }

  return result;
};

/*
  indexArrayContent

  Indexes contentful arrays into objs, uses contentful item name as the key.
  Convenient way to access objects via dot notation.
  
  Params: 
    [contentfulNode: arr][required]: Array

  Usage:

  relatedContents: [  
    [name: foo, id, stuff]
    [name: bar, id, stuff]
  ]
  
  indexArrayContent(relatedContents)
  
  returns {
    foo:  [name: foo, id, stuff]
    bar:  [name: bar, id, stuff]
  }
*/

export const indexArrayContent = (array: any[]) => {
  const result: any = {};

  if (!array) return null;
  array.forEach((item) => {
    const { name } = item.fields;

    result[name] = {
      ...buildContentTree(item.fields),
      ...buildContentTree(item.sys),
    };
  });

  return result;
};

/*
  parseMediaContent

  Returns the file obj in the contentful node via url. 

  Params: 
    [contentfulNode: Obj][required]: Field Object

  Usage:
    parseImageMediaContent(contentfulNode);

    returns {
      mobileUpUrl: url,
      tabletUpUrl: url,
      laptopUpUrl: url,
      desktopUpUrl: url

    }
*/
export const parseMediaContent = (contentfulNode: any): any => {
  const result: any = {};

  if (contentfulNode) {
    if (contentfulNode.contentType?.sys?.id === "mediaContent") {
      const nodeArray = Object.entries(contentfulNode);

      nodeArray.forEach(([key, value]: any) => {
        const contentType = contentTypeValidator(
          value.fields?.file?.contentType
        );

        if (contentType) {
          const imageUrl = `https:${value.fields.file.url}`;
          const imageDetails = value.fields.file.details.image;

          if (key === "mobile1x") {
            result.mobileUpUrl = imageUrl;

            if (imageDetails) {
              const { width, height } = imageDetails;

              result.mobileImageWidth = width;
              result.mobileImageHeight = height;
            }
          } else if (key === "tablet1x") {
            result.tabletUpUrl = imageUrl;

            if (imageDetails) {
              const { width, height } = imageDetails;

              result.tabletImageWidth = width;
              result.tabletImageHeight = height;
            }
          } else if (key === "laptop1x") {
            result.laptopUpUrl = imageUrl;

            if (imageDetails) {
              const { width, height } = imageDetails;

              result.laptopImageWidth = width;
              result.laptopImageHeight = height;
            }
          } else if (key === "desktop1x") {
            result.desktopUpUrl = imageUrl;

            if (imageDetails) {
              const { width, height } = imageDetails;

              result.desktopImageWidth = width;
              result.desktopImageHeight = height;
            }
          }
        }
      });
      return result;
    }
    console.error(
      "contentful.js parseMediaContent method, the following is not an image content type",
      contentfulNode
    );
    return result;
  }
  // console.error('contentful.js parseMediaContent method, no content passed');
  return result;
};

/*
  private: helper to index obj with field name
*/
const buildContentTree = (contentfulNode: any): any => {
  const result: any = {};

  Object.keys(contentfulNode).forEach((childNameKey) => {
    const childNode = contentfulNode[childNameKey];

    if (childNode && Array.isArray(childNode) && childNode.length) {
      const childNodeList: any = {};

      childNode.forEach((item) => {
        // Contentful img asset type does not have a name field
        // use title for key instead.
        if (item?.fields && (item?.fields?.name || item?.fields?.title)) {
          const contentName = item.fields.name || item.fields.title;

          childNodeList[contentName] = {
            ...buildContentTree(item.fields),
            ...buildContentTree(item.sys),
          };
        }
      });
      result[childNameKey] = childNodeList;
    } else {
      result[childNameKey] = childNode;
    }
  });

  return result;
};

/*
  private: helper to check the media content type
*/
const contentTypeValidator = (checkContentType: string) => {
  if (
    /image/.test(checkContentType) ||
    /video/.test(checkContentType) ||
    checkContentType === "application/json"
  ) {
    return true;
  }
  return false;
};

/*
  parseContentfulDataForProps: parses contentful node for a `backgroundImage` and `image` media asset.
  This page section structure is specific for this component and name those 2 related entries 
  - backgroundImage
  - image

  This component will fail gracefully because its wrapped in a try catch block.
  
  example ImageTitleBodyBlockComponent Contentful:
  https://app.contentful.com/spaces/e0ogkq6nyj4m/entries/2ooiOp345LOJosrHIOYZuY?previousEntries=3IlMmtOrmiIf3mF9QkIGJb 
*/

export const parseComponentContent = (
  contentfulNode: any,
  componentName: CommonComponentNames
) => {
  if (!contentfulNode) {
    console.warn("useImageTitleBodyCard error: need contentful node");
  }

  try {
    const relatedContentEntries = contentfulNode?.relatedContentEntries;
    let componentProps = {};

    if (componentName === "ImageTitleBodyBlock") {
      componentProps = {
        backgroundImage: contentfulNode?.img?.background?.file?.url || "",
        image: relatedContentEntries?.image,
        body: contentfulNode.bodyContent,
        title: contentfulNode.header,
      };
    }

    if (componentName === "VideoArticleBlock") {
      componentProps = {
        backgroundImage: contentfulNode?.img?.background?.file?.url || "",
        video: relatedContentEntries?.video,
        title: contentfulNode.header,
        subheader: contentfulNode.subheader,
        body: contentfulNode.bodyContent,
      };
    }

    return componentProps;
  } catch (e) {
    console.warn(
      "parseContentfulDataForProps Error: Error parsing items, please check contentful data",
      e
    );
  }
};

/*
  getAssetUrl: builds https url from contentful assets IE mobile1x etc
*/
export const getAssetUrl = (contenfulNode: any) => {
  const url = contenfulNode?.fields?.file?.url;

  return url ? `https:${contenfulNode?.fields?.file?.url}` : "";
};
