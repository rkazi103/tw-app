import { RefreshIcon } from "@heroicons/react/outline";
import { NextComponentType, NextPageContext } from "next";
import { useState } from "react";
import toast from "react-hot-toast";
import { fetchTweets } from "../lib/data";
import { Tweet as TweetType } from "../types";
import Tweet from "./Tweet";
import TweetBox from "./TweetBox";

type HomeProps = {
  tweets: TweetType[];
};

const Feed: NextComponentType<NextPageContext, any, HomeProps> = ({
  tweets: oldTweets,
}) => {
  const [tweets, setTweets] = useState<TweetType[]>(oldTweets);

  const refreshTweets = async () => {
    const refreshToast = toast.loading("Refreshing...");

    const tweets = await fetchTweets();
    setTweets(tweets);

    toast.success("Feed Updated!", {
      id: refreshToast,
    });
  };

  return (
    <div className="col-span-7 max-h-screen overflow-y-scroll border-x scrollbar-hide lg:col-span-5">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon
          className="mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
          onClick={() => refreshTweets()}
        />
      </div>

      <div>
        <TweetBox setTweets={setTweets} />
      </div>

      <div>
        {tweets.map(tweet => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
