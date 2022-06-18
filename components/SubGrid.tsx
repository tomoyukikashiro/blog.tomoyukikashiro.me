import { VFC } from "react";
import Link from "next/link";

const Item: VFC<{ post: Post }> = ({ post }) => (
  <div className="p-6 border rounded-xl">
    <div className="relative h-52 mb-6">
      {post.image ? (
        <img
          className="w-full h-full object-cover rounded-lg"
          src={post.image}
          alt=""
        />
      ) : (
        <span>no image</span>
      )}
    </div>
    <time
      dateTime={post.isoDate}
      className="inline-block mb-4 text-xs text-gray-500"
    >
      {post.formattedDate}
    </time>
    <h2 className="mb-4 text-2xl font-semibold font-heading">{post.title}</h2>
    {!!post.summary && (
      <p className="mb-4 text-gray-500 leading-relaxed">{post.summary}</p>
    )}
    <Link href={post.path}>
      <a className="text-lg font-medium text-red-500 underline hover:no-underline">
        Read more
      </a>
    </Link>
  </div>
);

export const SubGrid: VFC<{ posts: Post[] }> = ({ posts }) => (
  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {posts.map((post) => (
      <Item key={post.key} post={post} />
    ))}
  </div>
);
