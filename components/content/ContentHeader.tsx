import { VFC } from "react";

export const ContentHeader: VFC<{ post: Post }> = ({ post }) => (
  <section className="relative py-10">
    <img
      className="hidden lg:block absolute top-0 left-0 mt-24"
      src="/blue-dot-left-bars.svg"
      alt=""
    />
    <img
      className="hidden lg:block absolute top-0 right-0 mt-40"
      src="/yellow-dot-right-shield.svg"
      alt=""
    />
    <div className="container px-4 mx-auto">
      <div className="max-w-2xl mx-auto mb-16 text-center">
        <h2 className="mb-10 text-4xl font-semibold font-heading">
          {post.title}
        </h2>
        <div className="flex items-center justify-center">
          <div className="mr-6">
            <img
              className="w-16 h-16 object-cover object-top rounded-full"
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=334&amp;q=80"
              alt=""
            />
          </div>
          <div className="text-left">
            <h3 className="mb-2 text-2xl font-semibold font-heading">
              Tomoyuki Kashiro
            </h3>
            <time dateTime={post.isoDate} className="text-gray-500">
              {post.formattedDate}
            </time>
          </div>
        </div>
      </div>
      <div className="h-112">
        <img
          className="w-full h-full object-cover object-top rounded-lg"
          src="https://images.unsplash.com/photo-1524508762098-fd966ffb6ef9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80"
          alt=""
        />
      </div>
    </div>
  </section>
);
