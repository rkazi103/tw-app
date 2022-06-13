import { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../lib/sanity";
import { APIError, Comment, CommentBody } from "../../types";

type GetResponseData = {
  comments: Comment[];
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
    *[_type == "comment" && references(*[_type == "tweet" && _id == $tweetId]._id)] {
      _id,
      ...
    } | order(_createdAt desc)
  `;

    const { tweetId } = req.query;
    const comments: Comment[] = await sanityClient.fetch(query, { tweetId });

    res.status(200).json({ comments });
  } else if (req.method === "POST") {
    const comment: CommentBody = JSON.parse(req.body);

    const mutations = {
      mutations: [
        {
          create: {
            _type: "comment",
            comment: comment.comment,
            username: comment.username,
            profileImg: comment.profileImg,
            tweet: {
              _type: "reference",
              _ref: comment.tweetId,
            },
          },
        },
      ],
    };

    const result = await fetch(
      `https://${process.env.NEXT_PUBLIC_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
        },
        body: JSON.stringify(mutations),
        method: "POST",
      }
    ).then(res => res.json());

    res.status(201).json({ message: "Comment Created", results: result });
  } else res.status(405).json({ error: "Method not allowed" });
};

export default handler;
