type Environment = 'prod' | 'staging' | 'qa' | 'dev' | 'demo' | 'training' | 'test' | 'local';

export const isEnvironment = (env: Environment): boolean => {
  return process.env.APP_ENV === env;
};
