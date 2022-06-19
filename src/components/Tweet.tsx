/* eslint-disable @next/next/no-img-element */
import { NextComponentType, NextPageContext } from "next";
import {
  Comment as CommentType,
  CommentBody,
  Tweet as TweetType,
} from "../types";
import Timeago from "react-timeago";
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { FormEventHandler, useEffect, useState } from "react";
import { fetchComments } from "../lib/data";
import Comment from "./Comment";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

type TweetProps = {
  tweet: TweetType;
};

const Tweet: NextComponentType<NextPageContext, any, TweetProps> = ({
  tweet,
}) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentBoxOpen, setCommentBoxOpen] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      const comments = await fetchComments(tweet._id);
      setComments(comments);
    })();
  }, [tweet._id]);

  const createComment: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();

    const commentToast = toast.loading("Posting Comment...");

    const commentInfo: CommentBody = {
      comment: commentText,
      tweetId: tweet._id,
      username: session?.user?.name || "John Doe",
      profileImg: session?.user?.image || "https://bit.ly/3MN71zE",
    };

    await fetch("/api/comments", {
      body: JSON.stringify(commentInfo),
      method: "POST",
    });

    toast.success("Comment Posted!", {
      id: commentToast,
    });
    setCommentText("");
    setCommentBoxOpen(false);

    (async () => {
      const comments: CommentType[] = await fetchComments(tweet._id);
      setComments(comments);
    })();
  };

  return (
    <div className="flex flex-col space-x-3 border-y border-gray-100 p-5">
      <div className="flex space-x-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={tweet.profileImg}
          alt="Profile picture of person who tweeted"
        />

        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/g, "").toLowerCase()}
            </p>

            <Timeago
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>

          <p className="pt-1">{tweet.text}</p>

          {tweet.tweetImg && (
            <img
              src={tweet.tweetImg}
              alt="Picture provided in tweet"
              className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
            />
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-between">
        <div
          onClick={e => session && setCommentBoxOpen(!commentBoxOpen)}
          className="tweet-option"
        >
          <ChatAlt2Icon className="h-5 w-5" />
          <p>{comments.length}</p>
        </div>

        <div className="tweet-option">
          <SwitchHorizontalIcon className="h-5 w-5" />
        </div>

        <div className="tweet-option">
          <HeartIcon className="h-5 w-5" />
        </div>

        <div className="tweet-option">
          <UploadIcon className="h-5 w-5" />
        </div>
      </div>

      {commentBoxOpen && (
        <form className="mt-3 flex space-x-3" onSubmit={createComment}>
          <input
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
            type="text"
            placeholder="Write a comment..."
          />
          <button
            disabled={!commentText}
            className="text-twitter disabled:text-gray-200"
            type="submit"
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5 scrollbar-hide">
          {comments.map(comment => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tweet;
