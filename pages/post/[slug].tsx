import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { Footer } from "../../components/Footer";
import { ContentHeader } from "../../components/content/ContentHeader";
import { ContentBody } from "../../components/content/ContentBody";
import { SiteHead } from "../../components/SocialMediaHead";
import { ParsedUrlQuery } from "node:querystring";
import { getIssues } from "../../lib/github-client";
import { parseIssue } from "../../lib/parser";
import { Issue } from "@octokit/graphql-schema";
import ArticleLdJson from "../../components/ldJson/ArticleLdJson";
import { ContentComments } from "../../components/content/ContentComments";

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<{ post: Post }, Params> = async ({
  params,
  locale,
}) => {
  const { slug } = params as { slug: string };
  const [issue, alternate] = await getIssues({
    slug,
    count: 2,
  });
  if (!issue) return { notFound: true };
  const promises = [parseIssue(issue)];
  if (alternate) promises.push(parseIssue(alternate));
  const posts = await Promise.all(promises);
  const post = posts.find((post) => post.lang === locale);
  if (!post) return { notFound: true };
  const alternatePost = posts.find((post) => post.lang !== locale) || null;
  return {
    props: {
      post,
      alternatePost,
    },
    revalidate: 60 * 60,
  };
};

// @ts-ignore
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const posts = await getIssues({ count: 100 });
  if (!posts) return;
  const postData = await Promise.all(
    posts
      .filter((post): post is Issue => !!post)
      .map((post) => parseIssue(post))
  );
  return {
    paths: postData.map((post) => ({
      params: { slug: post.slug },
      locale: post.lang,
    })),
    fallback: false,
  };
};

const Content: NextPage<{ post: Post; alternatePost?: Post }> = ({
  post,
  alternatePost,
}) => {
  return (
    <>
      <SiteHead
        type="article"
        title={post.title}
        description={post.summary}
        image={post.image}
        url={post.url}
        lang={post.lang}
        createdAt={post.createdAt}
        alternateLang={alternatePost?.lang}
        alternateUrl={alternatePost?.url}
      />
      <ArticleLdJson post={post} />
      <article className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <ContentHeader post={post} />
          <ContentBody post={post} />
          <ContentComments
            githubUrl={post.githubUrl}
            comments={post.comments}
          />
        </div>
      </article>
      <Footer />
    </>
  );
};

export default Content;
