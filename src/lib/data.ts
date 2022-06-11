import { Tweet } from "../types";

export const fetchTweets = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tweets`
  ).then(res => res.json());
  const tweets: Tweet[] = data.tweets;

  return tweets;
};
