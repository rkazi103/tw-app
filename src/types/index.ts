export type TweetBody = {
  text: string;
  username: string;
  profileImg: string;
  tweetImg?: string;
};

export interface Tweet extends TweetBody {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "tweet";
  blockTweet: boolean;
}
