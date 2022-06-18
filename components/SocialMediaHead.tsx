import { VFC } from "react";
import Head from "next/head";

export const SiteHead: VFC = () => {
  const description =
    "A Web developer in Tokyo focus on React and Node.js. Google Mobile Web Specialist / Google Analytics Individual Qualification";
  const title = "Tomoyuki Kashiro's Blog";
  return (
    <Head>
      <meta name="theme-color" content="#ffffff" />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://blog.tomoyukikashiro.me/images/home.jpg"
      />
      <meta property="og:url" content="https://blog.tomoyukikashiro.me/" />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="en" />
      <meta property="og:site_name" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@tomoyukikashiro" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://blog.tomoyukikashiro.me/images/home.jpg"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="icon" type="image/png" sizes="48x48" href="/favicon.ico" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="Tomoyuki Kashiro's blog RSS Feed"
        href="/rss.xml"
      />
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      <title>{title}</title>
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ff5722" />
      <link rel="canonical" href="https://blog.tomoyukikashiro.me/" />
      <link
        rel="preconnect"
        href="https://www.google-analytics.com"
        referrerPolicy="origin"
      />
    </Head>
  );
};

export const PostHead: VFC<{ post: Post }> = ({ post }) => (
  <Head>
    {/* BASIC */}
    <meta property="og:title" content={post.title} />
    <meta property="og:type" content="article" />
    {post.image && <meta property="og:image" content={post.image} />}
    <meta property="og:url" content={post.url} />

    {/* OPTIONAL */}
    <meta property="og:description" content={post.summary.replace(/"/g, "")} />
    <meta property="og:locale" content={post.lang} />
    <meta property="og:site_name" content="Tomoyuki Kashiro's Blog" />

    {/* og:type:article */}
    <meta property="article:published_time" content={post.date} />
    <meta property="profile:username" content="Tomoyuki Kashiro" />

    {/* twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@tomoyukikashiro" />
    <meta name="twitter:title" content={post.title} />
    <meta name="twitter:description" content={post.summary.replace(/"/g, "")} />
    {post.image && <meta name="twitter:image" content={post.image} />}
  </Head>
);
