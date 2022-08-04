/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en-US", "ja-JP"],
    defaultLocale: "en-US",
    localeDetection: false,
  },
  images: {
    domains: [
      "i.gyazo.com",
      "user-images.githubusercontent.com",
      "avatars.githubusercontent.com",
      "blog.tomoyukikashiro.me",
    ],
  },
  async redirects() {
    return [
      {
        source: "/post/ja/:slug",
        destination: "/ja-JP/post/:slug",
        permanent: true,
      },
    ];
  },
};
