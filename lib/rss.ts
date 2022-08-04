import fs from "fs";
import { Feed } from "feed";
import { getIssues } from "./github-client";
import { Issue } from "@octokit/graphql-schema";
import { parseIssue } from "./parser";

const generatedRssFeed = async (): Promise<void> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const date = new Date();

  const feed = new Feed({
    title: "Tomoyuki Kashiro's Blog",
    description:
      "A Web developer in Tokyo focus on React/Vue and Rails/Django. Google Mobile Web Specialist / Google Analytics Individual Qualification",
    id: baseUrl,
    link: baseUrl,
    copyright: `All rights reserved ${date.getFullYear()}, Tomoyuki Kashiro`,
    updated: date,
    feedLinks: {
      atom: `${baseUrl}/rss.xml`,
    },
    author: {
      name: "Tomoyuki Kashiro",
      link: "https://tomoyukikashiro.me",
    },
  });

  const posts = await getIssues({ count: 10 });
  if (!posts) return;
  const postData = await Promise.all(
    posts
      .filter((post): post is Issue => !!post)
      .map((post) => parseIssue(post))
  );

  postData.forEach((post) => {
    feed.addItem({
      title: post.title,
      description: post.summary,
      id: post.key,
      link: post.url,
      content: post.html,
      date: new Date(post.updatedAt),
      published: new Date(post.createdAt),
    });
  });

  fs.writeFileSync("./public/rss.xml", feed.atom1());
};

export default generatedRssFeed;
