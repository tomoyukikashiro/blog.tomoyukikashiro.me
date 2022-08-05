import type { GetStaticProps, NextPage } from "next";
import { Footer } from "../components/Footer";
import { MainGrid } from "../components/MainGrid";
import { SiteHead } from "../components/SocialMediaHead";
import { getIssues } from "../lib/github-client";
import { Issue } from "@octokit/graphql-schema";
import { parseIssue } from "../lib/parser";
import generatedRssFeed from "../lib/rss";
import generatedSitemap from "../lib/sitemap";

type Props = {
  posts: Post[];
};

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const posts = await getIssues({ count: 6 });
  if (!posts) return { notFound: true };
  const postData = await Promise.all(
    posts
      .filter((post): post is Issue => !!post)
      .map((post) => parseIssue(post))
  );

  await generatedRssFeed();
  await generatedSitemap();

  return {
    props: {
      posts: postData,
    },
    revalidate: 60 * 60,
  };
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <SiteHead
        title="Tomoyuki Kashiro's Blog"
        description="A Web developer in Tokyo focus on React and Node.js. Google Mobile Web Specialist / Google Analytics Individual Qualification"
        image="https://blog.tomoyukikashiro.me/images/home.jpg"
        url="https://blog.tomoyukikashiro.me"
        type="website"
        lang="en-US"
        createdAt={posts.at(0)!.createdAt}
        alternateUrl="https://blog.tomoyukikashiro.me"
        alternateLang="x-default"
      />
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <span className="text-lg font-extrabold text-indigo-500">
              Tomoyuki Kashiro&apos;s Blog
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold font-heading mt-2 mb-4">
              sharing knowledge driven development
            </h1>
          </div>
          <MainGrid posts={posts} />
          <Footer />
        </div>
      </section>
    </>
  );
};

export default Home;
