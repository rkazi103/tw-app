/* eslint-disable @next/next/no-img-element */
import { NextComponentType, NextPageContext } from "next";
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { Tweet, TweetBody } from "../types";
import { fetchTweets } from "../lib/data";
import toast from "react-hot-toast";

type TweetBoxProps = {
  setTweets: Dispatch<SetStateAction<Tweet[]>>;
};

const TweetBox: NextComponentType<NextPageContext, any, TweetBoxProps> = ({
  setTweets,
}) => {
  const [inputText, setInputText] = useState<string>("");
  const { data: session } = useSession();
  const [imageUrlBoxOpen, setImageUrlBoxOpen] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>("");
  const imageInputRef = useRef<HTMLInputElement>(null);

  const addImageToTweet: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    if (!imageInputRef.current?.value) return;

    setImageUrl(imageInputRef.current.value);
    imageInputRef.current.value = "";
    setImageUrlBoxOpen(false);
  };

  const pushTweetToDb = async () => {
    const tweetInfo: TweetBody = {
      text: inputText,
      username: session?.user?.name || "John Doe",
      profileImg: session?.user?.image || "https://bit.ly/3MN71zE",
      tweetImg: imageUrl,
    };

    await fetch(`/api/tweets`, {
      body: JSON.stringify(tweetInfo),
      method: "POST",
    });

    const newTweets = await fetchTweets();
    setTweets(newTweets);

    toast("Tweet Posted", {
      icon: "🚀",
    });
  };

  const createTweet: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();

    pushTweetToDb();

    setInputText("");
    setImageUrl("");
    setImageUrlBoxOpen(false);
  };

  return (
    <div className="flex space-x-2 p-5">
      <img
        className="mt-4 h-14 w-14 rounded-full object-cover"
        src={session?.user?.image || "/images/default-avatar.jpg"}
        alt="Default Avatar"
      />

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            type="text"
            placeholder="What's Happening?"
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
          />

          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon
                onClick={() => setImageUrlBoxOpen(!imageUrlBoxOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />

              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>

            <button
              disabled={!inputText || !session}
              className="rounded-full bg-twitter px-5 py-2 font-bold text-white disabled:opacity-40"
              onClick={createTweet}
            >
              Tweet
            </button>
          </div>

          {imageUrlBoxOpen && (
            <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
              <input
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                type="text"
                placeholder="Enter Image URL..."
                ref={imageInputRef}
              />

              <button
                className="font-bold text-white"
                type="submit"
                onClick={addImageToTweet}
              >
                Add Image
              </button>
            </form>
          )}

          {imageUrl && (
            <img
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
              src={imageUrl}
              alt="picture for tweet that will be posted"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default TweetBox;
