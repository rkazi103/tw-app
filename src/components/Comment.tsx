/* eslint-disable @next/next/no-img-element */
import { NextComponentType, NextPageContext } from "next";
import Timeago from "react-timeago";
import { Comment as CommentType } from "../types";

type CommentProps = {
  comment: CommentType;
};

const Comment: NextComponentType<NextPageContext, any, CommentProps> = ({
  comment,
}) => {
  return (
    <div className="relative flex space-x-2">
      <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />

      <img
        src={comment.profileImg}
        alt="Profile picture of person who tweeted comment"
        className="mt-2 h-7 w-7 rounded-full object-cover"
      />

      <div>
        <div className="flex items-center space-x-1">
          <p className="mr-1 font-bold">{comment.username}</p>
          <p className="hidden text-sm text-gray-500 lg:inline">
            @{comment.username.replace(/\s+/g, "").toLowerCase()}
          </p>

          <Timeago
            className="text-sm text-gray-500"
            date={comment._createdAt}
          />
        </div>

        <p>{comment.comment}</p>
      </div>
    </div>
  );
};

export default Comment;
