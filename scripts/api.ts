import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsEnDirectory = join(process.cwd(), "contents");
const postsJaDirectory = join(process.cwd(), "contents/ja");

export const getEnPostSlug = (): string[] => {
  return fs
    .readdirSync(postsEnDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .filter((dirent) => dirent.name !== "ja")
    .map(({ name }) => name);
};

export const getJaPostSlug = (): string[] => {
  return fs
    .readdirSync(postsJaDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map(({ name }) => name);
};

export const getPostSlugs = (): string[] => {
  const enAll = getEnPostSlug();
  const jaAll = getJaPostSlug().map((slug) => `ja/${slug}`);
  return [...enAll, ...jaAll];
};

export const getPostBySlug = (slug: string) => {
  const fullPath = join(join(process.cwd(), "contents"), slug, "index.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const {
    data: { date, ...rest },
    content,
  } = matter(fileContents);
  const postPath = join("/post", slug);

  return {
    date: date.toString(),
    ...rest,
    content,
    isoDate: date.toISOString(),
    formattedDate: date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    key: `${rest.lang}_${slug}`,
    path: postPath,
    url: `https://blog.tomoyukikashiro.me${postPath}`,
  } as Post;
};

export const getPostByTag = (tag: string) => {
  const posts = getAllPosts();
  return posts.filter((post) => {
    if (!post.tags) return false;
    return post.tags.includes(tag);
  });
};

export const getAllPosts = () => {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return posts;
};
