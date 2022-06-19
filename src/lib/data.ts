import { z } from "zod";
import { Tweet, Comment } from "../types/validators";

export const fetchTweets = async () => {
  const data = await (
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tweets`)
  ).json();

  return z.array(Tweet).parse(data.tweets);
};

export const fetchComments = async (tweetId: string) => {
  const res = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments?tweetId=${tweetId}`
    )
  ).json();

  return z.array(Comment).parse(res.comments);
};
