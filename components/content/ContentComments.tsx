import { VFC } from "react";
import Image from "next/image";
import { emojiTable } from "../../lib/reaction";

const rtf = new Intl.RelativeTimeFormat("en", { style: "narrow" });
const relativeDateFormat = (date: Date) => {
  const diff = Math.ceil(
    (date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  return rtf.format(diff, "day");
};

export const ContentComments: VFC<{
  githubUrl: string;
  comments: Post["comments"];
}> = ({ githubUrl, comments }) => {
  if (!comments) return null;
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-3 my-6">
      {comments.map((comment) => (
        <div key={comment.id} className="border border-indigo-900 p-3">
          <div
            className=" prose prose-sky prose-img:mx-auto max-w-full mb-3"
            dangerouslySetInnerHTML={{ __html: comment.body }}
          />
          <div className="flex items-center justify-end gap-6 flex-wrap">
            <ul className="flex flex-row justify-center sm:justify-end gap-1 items-center flex-1">
              {Object.entries(emojiTable(comment.reactions)).map(
                ([emoji, count]) => (
                  <li
                    key={emoji}
                    className="text-sm font-extrabold px-2 text-indigo-900"
                  >
                    {emoji} {count}
                  </li>
                )
              )}
            </ul>
            <div>
              <time dateTime={new Date(comment.createdAt).toISOString()}>
                <a
                  href={`${githubUrl}#issuecomment-${comment.id}`}
                  className="hover:text-indigo-800 hover:underline"
                >
                  {relativeDateFormat(new Date(comment.createdAt))}
                </a>
              </time>
              <div>{comment.author.name}</div>
            </div>
            <div>
              <Image
                className="rounded-full"
                src={comment.author.avatarUrl}
                width={32}
                height={32}
                alt={comment.author.name}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
