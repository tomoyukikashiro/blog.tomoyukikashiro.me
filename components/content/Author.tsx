import { VFC } from "react";
import Image from "next/image";

const Author: VFC<{ post: Post }> = ({ post }) => (
  <div className="flex items-center mb-12">
    <div className="h-[40px]">
      <Image
        src={post.author.avatarUrl}
        width="40"
        height="40"
        alt={post.author.name}
        className="rounded-full"
      />
    </div>
    <div className="ml-3">
      <div className="text-base font-bold text-gray-800">
        {post.author.name}
      </div>
      <div>
        <time
          className="text-sm font-bold text-gray-400"
          dateTime={new Date(post.createdAt).toISOString()}
        >
          {post.createdAt} created
        </time>
        {post.createdAt !== post.updatedAt && (
          <time
            className="text-sm font-bold text-gray-400 ml-3"
            dateTime={new Date(post.createdAt).toISOString()}
          >
            ( {post.updatedAt} updated )
          </time>
        )}
      </div>
    </div>
  </div>
);

export default Author;
