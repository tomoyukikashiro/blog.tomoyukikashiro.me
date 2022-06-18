import type { InferGetStaticPropsType, NextPage } from "next";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MainGrid } from "../components/MainGrid";
import { getAllPosts } from "../scripts/api";
import { SiteHead } from "../components/SocialMediaHead";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const posts = getAllPosts();

  return {
    props: { posts },
  };
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <SiteHead />
      <Header />
      <MainGrid posts={posts} />
      <Footer />
    </>
  );
};

export default Home;
