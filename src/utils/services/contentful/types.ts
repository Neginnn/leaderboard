export interface ContentfulClientConfig {
  space: string;
  accessToken: string;
  host?: string;
}

// Below Space name types corresponds to Contentful app apace names
// localed top right corner in the contentful portal
export type SpaceNames = "app" | "";

export type CommonComponentNames = "ImageTitleBodyBlock" | "VideoArticleBlock";
