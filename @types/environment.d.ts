namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_SANITY_DATASET: string;
    NEXT_PUBLIC_PROJECT_ID: string;
    SANITY_API_TOKEN: string;
    NEXT_PUBLIC_BASE_URL: string;
    TWITTER_CLIENT_ID: string;
    TWITTER_CLIENT_SECRET: string;
  }
}
