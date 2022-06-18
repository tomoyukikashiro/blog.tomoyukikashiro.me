import type { NextPage } from "next";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { TagHeader } from "../../components/tag/TagHeader";
import { SubGrid } from "../../components/SubGrid";
import { getAllPosts, getPostByTag } from "../../scripts/api";

export const getStaticPaths = async () => {
  const posts = getAllPosts();
  const tags = posts.flatMap((post) => post.tags).filter((tag) => !!tag);
  // @ts-ignore
  const uniq = [...new Set(tags)];

  return {
    paths: uniq.map((tag) => {
      return {
        params: {
          tag,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const posts = getPostByTag(params.tag);

  return {
    props: { posts, tag: params.tag },
  };
};

const Tag: NextPage<{ posts: Post[]; tag: string }> = ({ posts, tag }) => {
  return (
    <>
      <Header />
      <section className="relative py-20">
        <div className=" container px-4 mx-auto">
          <TagHeader tag={tag} />
          <SubGrid posts={posts} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Tag;
