import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../lib/sanity";
import { Tweet } from "../../types";

type ResponseData = {
  tweets: Tweet[];
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const query = groq`
    *[_type == "tweet" && !blockTweet] {
      _id,
      ...
    } | order(_createdAt desc)
  `;

  const tweets: Tweet[] = await sanityClient.fetch(query);

  res.status(200).json({ tweets });
};

export default handler;
