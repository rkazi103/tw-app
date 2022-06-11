import { createClient } from "next-sanity";

export const sanityClient = createClient({
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  apiVersion: "v2021-10-21",
  useCdn: process.env.NODE_ENV === "production",
});
