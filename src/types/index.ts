import { z } from "zod";
import { Comment, CommentBody, Tweet, TweetBody } from "./validators";

export type Tweet = z.infer<typeof Tweet>;
export type TweetBody = z.infer<typeof TweetBody>;
export type Comment = z.infer<typeof Comment>;
export type CommentBody = z.infer<typeof CommentBody>;

export type APIError = {
  error: string;
};
