type NodeEnv =
  | "production"
  | "staging"
  | "qa"
  | "develop"
  | "test"
  | "local"
  | "demo";

interface SpaceDetails {
  accessToken: string;
  spaceId: string;
}

type ConfigDefinition = {
  nodeEnv: NodeEnv;
  contentful: {
    app: {
      prod: SpaceDetails;
      preview: SpaceDetails;
    };
  };
  segment: {
    writeKey: string;
  };
};
