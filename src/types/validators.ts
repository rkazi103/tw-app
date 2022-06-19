import { z } from "zod";

export const TweetBody = z.object({
  text: z.string().min(1).max(280),
  username: z.string().min(1).max(50),
  profileImg: z.string().min(1).max(200),
  tweetImg: z.string().min(1).max(200).optional(),
});

export const Tweet = TweetBody.extend({
  _id: z.string().min(1),
  _createdAt: z.string().min(1),
  _updatedAt: z.string().min(1),
  _rev: z.string().min(1),
  _type: z.literal("tweet"),
  blockTweet: z.boolean(),
});

export const CommentBody = z.object({
  comment: z.string().min(1).max(280),
  tweetId: z.string().min(1).max(50).optional(),
  username: z.string().min(1).max(50),
  profileImg: z.string().min(1).max(200),
});

export const Comment = CommentBody.extend({
  _id: z.string().min(1),
  _createdAt: z.string().min(1),
  _updatedAt: z.string().min(1),
  _rev: z.string().min(1),
  _type: z.literal("comment"),
  tweet: z.object({
    _ref: z.string().min(1).max(50),
    _type: z.literal("reference"),
  }),
});
