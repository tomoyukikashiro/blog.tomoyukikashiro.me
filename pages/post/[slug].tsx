import { NextPage } from "next";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ContentHeader } from "../../components/content/ContentHeader";
import { ContentBody } from "../../components/content/ContentBody";
import { Profile } from "../../components/Profile";
import { getEnPostSlug, getPostBySlug } from "../../scripts/api";
import markdownToHtml from "../../lib/mdToHtml";
import { PostHead } from "../../components/SocialMediaHead";

export const getStaticPaths = async () => {
  return {
    paths: getEnPostSlug().map((slug) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const post = getPostBySlug(params.slug);
  const content = await markdownToHtml(post.content);

  return {
    props: { post, content },
  };
};

const Content: NextPage<{ post: Post; content: string }> = ({
  post,
  content,
}) => (
  <>
    <PostHead post={post} />
    <Header />
    <article>
      <ContentHeader post={post} />
      <ContentBody content={content} />
      <Profile />
    </article>
    <Footer />
  </>
);

export default Content;
