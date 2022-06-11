import { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../lib/sanity";
import { Comment } from "../../types";

type ResponseData = {
  comments: Comment[];
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const query = groq`
    *[_type == "comment" && references(*[_type == "tweet" && _id == $tweetId]._id)] {
      _id,
      ...
    } | order(_createdAt desc)
  `;

  const { tweetId } = req.query;
  const comments: Comment[] = await sanityClient.fetch(query, { tweetId });

  res.status(200).json({ comments });
};

export default handler;
