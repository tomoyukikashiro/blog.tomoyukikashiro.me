import { VFC } from "react";
import Head from "next/head";

export const SiteHead: VFC<{
  type: "website" | "article";
  title: Post["title"];
  description: Post["summary"];
  image: Post["image"];
  url: Post["url"];
  lang: Post["lang"];
  createdAt: Post["createdAt"];
  alternateUrl?: Post["url"];
  alternateLang?: Post["lang"] | "x-default";
}> = ({
  type,
  title,
  description,
  image,
  url,
  lang,
  createdAt,
  alternateUrl,
  alternateLang,
}) => (
  <Head>
    {/* BASIC */}
    <title>{title}</title>
    <meta name="description" content={description} />

    {/* OGP */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description?.replace(/"/g, "")} />
    <meta property="og:type" content={type} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta property="og:locale" content={lang} />
    <meta property="og:site_name" content="Tomoyuki Kashiro's Blog" />
    <meta property="profile:first_name" content="Tomoyuki" />
    <meta property="profile:last_name" content="Kashiro" />
    <meta property="profile:username" content="tomoyukikashiro" />
    <meta name="robots" content="max-image-preview:large" />

    {/* og:type:article */}
    {type === "article" && createdAt && (
      <meta
        property="article:published_time"
        content={new Date(createdAt).toISOString()}
      />
    )}

    {/* twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@tomoyukikashiro" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description?.replace(/"/g, "")} />
    <meta name="twitter:image" content={image} />

    {/* alternate  */}
    {/* https://developers.google.com/search/docs/advanced/crawling/localized-versions */}
    {alternateUrl && alternateLang && (
      <link rel="alternate" href={alternateUrl} hrefLang={alternateLang} />
    )}
    {/* https://ogp.me/#optional */}
    {alternateLang && (
      <meta property="og:locale:alternate" content={alternateLang} />
    )}
  </Head>
);
