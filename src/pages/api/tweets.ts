import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../lib/sanity";
import { APIError, Tweet, TweetBody } from "../../types";

type GetResponseData = {
  tweets: Tweet[];
};

type PostResponseData = {
  message: string;
  results: any;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetResponseData | PostResponseData | APIError>
) => {
  if (req.method === "GET") {
    const query = groq`
    *[_type == "tweet" && !blockTweet] {
      _id,
      ...
    } | order(_createdAt desc)
  `;

    const tweets: Tweet[] = await sanityClient.fetch(query);

    res.status(200).json({ tweets });
  } else if (req.method === "POST") {
    const data: TweetBody = JSON.parse(req.body);

    const mutations = {
      mutations: [
        {
          create: {
            _type: "tweet",
            text: data.text,
            username: data.username,
            blockTweet: false,
            profileImg: data.profileImg,
            tweetImg: data.tweetImg,
          },
        },
      ],
    };

    const apiEndpoint = `https://${process.env.NEXT_PUBLIC_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;

    const results = await fetch(apiEndpoint, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
      },
      body: JSON.stringify(mutations),
      method: "POST",
    }).then(res => res.json());

    res.status(201).json({ message: "Tweet Created", results });
  } else res.status(405).json({ error: "Method not allowed" });
};

export default handler;
