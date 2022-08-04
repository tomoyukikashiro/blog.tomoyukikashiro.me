import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

const Item: FC<{ post: Post }> = ({ post }) => (
  <div className="w-full lg:w-1/2 px-4 mb-8">
    <div className="bg-white border-3 border-indigo-900 shadow-md rounded-2xl overflow-hidden">
      <Link href={post.path}>
        <a>
          <Image
            className="h-64 md:h-96 w-full block object-cover"
            src={post.image}
            layout="responsive"
            width="1280"
            height="670"
            alt={post.title}
          />
        </a>
      </Link>
      <div className="px-6 py-5 md:px-10 md:py-6 border-t-3 border-indigo-900">
        <time
          dateTime={new Date(post.createdAt).toISOString()}
          className="inline-block mb-4 text-xs font-bold text-gray-800"
        >
          {post.createdAt}
        </time>
        <h2 className="text-2xl font-extrabold mb-6">{post.title}</h2>
        <Link href={post.path}>
          <a className="inline-block text-xl font-bold text-indigo-500 hover:text-indigo-600">
            Read More
          </a>
        </Link>
      </div>
    </div>
  </div>
);

export const MainGrid: FC<{ posts: Post[] }> = ({ posts }) => (
  <main className="flex flex-wrap -mx-4 -mb-8">
    {posts.map((post) => (
      <Item key={post.key} post={post} />
    ))}
  </main>
);
