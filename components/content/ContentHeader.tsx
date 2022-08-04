import { VFC } from "react";
import { emojiTable } from "../../lib/reaction";

export const ContentHeader: VFC<{ post: Post }> = ({ post }) => {
  const reactions = emojiTable(post.reactions);
  return (
    <header className="max-w-4xl mx-auto mb-12 text-center">
      <time
        className="text-xl font-bold text-gray-400 mb-2"
        dateTime={new Date(post.createdAt).toISOString()}
      >
        {post.createdAt}
      </time>
      <h1 className="text-3xl md:text-4xl font-extrabold font-heading mb-8">
        {post.title}
      </h1>

      <div className="gap-2 flex justify-center mb-8">
        {post.tags?.map((tag) => (
          <span
            key={tag}
            className="inline-flex h-6 items-center justify-center text-xs font-extrabold px-2 text-indigo-900 rounded border border-indigo-900 bg-green-200 uppercase"
          >
            {tag}
          </span>
        ))}
      </div>
      {!!Object.keys(reactions).length && (
        <div className="flex justify-center items-center mb-8 border-y-2 border-indigo-900 py-2">
          <span className="mr-3 text-lg font-extrabold px-2 text-indigo-900">
            Reactions :
          </span>
          <ul className="flex justify-start gap-1 items-center">
            {Object.entries(reactions).map(([emoji, count]) => (
              <li
                key={emoji}
                className="text-lg font-extrabold px-2 text-indigo-900"
              >
                {emoji} {count}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
