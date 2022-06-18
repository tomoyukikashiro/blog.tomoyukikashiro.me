import { VFC } from "react";
import Link from "next/link";

const Item: VFC<{ post: Post }> = ({ post }) => (
  <div className="first:lg:col-span-2">
    <div className="flex h-96 mb-10 border border-gray-300 border-solid rounded-xl">
      {post.image ? (
        <img
          className="w-full h-full object-cover rounded-xl"
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
    <h2 className="mb-4 text-3xl font-semibold font-heading">{post.title}</h2>
    {!!post.summary && (
      <p className="mb-4 text-xl text-gray-500">{post.summary}</p>
    )}
    <Link href={post.path}>
      <a className="text-lg font-medium text-red-500 underline hover:no-underline">
        Read more
      </a>
    </Link>
  </div>
);

export const MainGrid: VFC<{ posts: Post[] }> = ({ posts }) => (
  <main className="py-10">
    <div className="container px-4 mx-auto grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
      {posts.map((post) => (
        <Item key={post.key} post={post} />
      ))}
    </div>
  </main>
);
