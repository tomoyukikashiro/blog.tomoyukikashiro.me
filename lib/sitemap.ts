import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { getIssues } from "./github-client";
import { Issue } from "@octokit/graphql-schema";
import { parseIssue } from "./parser";
import fs from "fs";

const generatedSitemap = async (): Promise<void> => {
  const posts = await getIssues({ count: 100 });
  if (!posts) return;
  const postData = await Promise.all(
    posts
      .filter((post): post is Issue => !!post)
      .map((post) => parseIssue(post))
  );

  const links = postData.map((post) => {
    const alternate = postData.find(
      (p) => post.lang !== p.lang && post.slug === p.slug
    );
    const link = {
      url: post.url,
      changefreq: "daily",
      priority: 0.7,
    };
    if (alternate) {
      // @ts-ignore
      link.links = [{ lang: alternate.lang, url: alternate.url }];
    }
    return link;
  });
  const stream = new SitemapStream({
    hostname: "https://blog.tomoyukikashiro.me",
  });
  const sitemapXml = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then((data) => data.toString());
  fs.writeFileSync("./public/sitemap.xml", sitemapXml);
};

export default generatedSitemap;
