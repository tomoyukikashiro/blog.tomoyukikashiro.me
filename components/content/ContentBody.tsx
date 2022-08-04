import { SyntheticEvent, useEffect, useState, VFC } from "react";
import Image from "next/image";

export const ContentBody: VFC<{ post: Post }> = ({ post }) => {
  const tweet = encodeURIComponent(
    `I just read "${post.title}" by @tomoyukikashiro\n\n`
  );
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweet}&url=${encodeURIComponent(
    post.url
  )}`;
  const [shareable, setShareable] = useState<boolean>(false);
  useEffect(() => {
    setShareable(!!navigator.share);
  }, []);

  const share = (event: SyntheticEvent) => {
    event.preventDefault();
    navigator.share({
      title: post.title,
      text: post.title,
      url: post.url,
    });
  };

  const copy = (event: SyntheticEvent) => {
    event.preventDefault();
    navigator.clipboard.writeText(post.url);
  };

  return (
    <>
      {post.image && (
        <div className="mb-12 mx-auto border-3 border-indigo-900 rounded-2xl shadow-lg max-w-5xl">
          <Image
            className="block w-full rounded-2xl"
            src={post.image}
            layout="responsive"
            width="1280"
            height="670"
            alt=""
          />
        </div>
      )}
      <div
        className="max-w-4xl mx-auto mb-10 prose prose-sky prose-img:mx-auto"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <div className="md:flex justify-center items-center gap-6">
        {shareable ? (
          <button
            onClick={share}
            className="inline-block w-full md:w-auto py-3 px-8 text-center leading-6 text-lg text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200"
          >
            Share Link
          </button>
        ) : (
          <>
            <button
              onClick={copy}
              className="inline-block w-full md:w-auto mb-4 md:mb-0 py-3 px-8 text-center leading-6 text-lg text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200"
            >
              Copy Link
            </button>
            <a
              href={tweetUrl}
              target="_blank"
              className="inline-flex items-center justify-center w-14 h-14 border-3 border-indigo-900 hover:border-indigo-800 rounded bg-white text-indigo-900 hover:text-indigo-800 shadow"
              rel="noreferrer"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M29.0909 8.19468C28.1808 8.59795 27.2042 8.87145 26.1782 8.99355C27.2259 8.3662 28.0278 7.37113 28.4079 6.18907C27.4252 6.77004 26.3404 7.19189 25.1846 7.42058C24.2591 6.43323 22.9426 5.81824 21.4824 5.81824C18.681 5.81824 16.4097 8.08963 16.4097 10.8895C16.4097 11.2866 16.4545 11.6744 16.541 12.0453C12.3258 11.8336 8.58808 9.81404 6.08646 6.74531C5.64917 7.49319 5.4004 8.36462 5.4004 9.29484C5.4004 11.0548 6.2966 12.6077 7.65636 13.5162C6.82505 13.4884 6.04319 13.2597 5.3587 12.8796V12.943C5.3587 15.3998 7.10783 17.4502 9.42711 17.9169C9.00218 18.0312 8.5541 18.0946 8.09054 18.0946C7.76299 18.0946 7.44622 18.0621 7.13563 18.0003C7.78149 20.0167 9.65426 21.4831 11.8731 21.5233C10.1379 22.883 7.94994 23.6912 5.57349 23.6912C5.16404 23.6912 4.76072 23.6664 4.36363 23.6216C6.60876 25.0633 9.27418 25.9039 12.1389 25.9039C21.4701 25.9039 26.5707 18.1749 26.5707 11.472L26.5537 10.8153C27.5503 10.1045 28.4125 9.21141 29.0909 8.19468Z"
                  fill="currentColor"
                ></path>
              </svg>
            </a>
          </>
        )}
      </div>
    </>
  );
};
