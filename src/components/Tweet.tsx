/* eslint-disable @next/next/no-img-element */
import { NextComponentType, NextPageContext } from "next";
import { Tweet as TweetType } from "../types";
import Timeago from "react-timeago";
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from "@heroicons/react/outline";

type TweetProps = {
  tweet: TweetType;
};

const Tweet: NextComponentType<NextPageContext, any, TweetProps> = ({
  tweet,
}) => {
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
        <div className="tweet-option">
          <ChatAlt2Icon className="h-5 w-5" />
          <p>5</p>
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
    </div>
  );
};

export default Tweet;
