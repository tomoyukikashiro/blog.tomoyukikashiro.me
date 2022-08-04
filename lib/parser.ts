import { unified } from "unified";
import markdown from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkParserFrontmatter from "remark-parse-frontmatter";
import smartypants from "remark-smartypants";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import images from "remark-images";
import markdown2rehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import html from "rehype-stringify";
import { Issue, IssueComment } from "@octokit/graphql-schema";
import rehypePresetMinify from "rehype-preset-minify";
import rehypePrism from "rehype-prism-plus";

const siteUrl = `https://blog.tomoyukikashiro.me`;

const parseComment = async (comment: PostComment["body"]): Promise<string> => {
  const vFile = await unified()
    .use(markdown)
    .use(smartypants)
    .use(remarkBreaks)
    .use(remarkGfm)
    .use(images)
    .use(markdown2rehype, { allowDangerousHtml: false })
    .use(rehypePrism)
    .use(rehypePresetMinify)
    .use(rehypeSanitize)
    .use(html)
    .process(comment);

  const { value: bodyHtml } = vFile;
  return bodyHtml.toString();
};

export const parseIssue = async (post: Issue): Promise<Post> => {
  // https://spectrum.chat/unified/remark/markdown-to-html-with-parsed-yaml-frontmatter~d75254e5-de66-4719-8464-ae459e33fddf
  const vFile = await unified()
    .use(markdown)
    .use(smartypants)
    .use(remarkBreaks)
    .use(remarkGfm)
    .use(remarkFrontmatter, ["yaml"])
    .use(remarkParserFrontmatter)
    .use(images)
    .use(markdown2rehype, { allowDangerousHtml: false })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypePrism)
    .use(rehypePresetMinify)
    .use(html)
    .process(post.body);

  const {
    data: { frontmatter },
    value: bodyHtml,
  } = vFile;
  return await postInfo(post, frontmatter as FrontMatter, bodyHtml as string);
};

const postInfo = async (
  post: Issue,
  frontMatter: FrontMatter,
  html: string
): Promise<Post> => {
  const publishedDate = new Date(frontMatter.date || post.createdAt);
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("en", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  const isEn = frontMatter.lang === "en-US";
  const isJa = frontMatter.lang === "ja-JP";
  const path = isJa
    ? `/ja-JP/post/${frontMatter.slug}`
    : `/post/${frontMatter.slug}`;
  const reactions = (post.reactions.nodes as Reaction[]) || [];
  const comments = await Promise.all(
    post.comments.nodes
      ?.filter((comment): comment is IssueComment => true)
      .map(async (comment): Promise<PostComment> => {
        return {
          id: comment.id,
          author: {
            avatarUrl: comment.author!.avatarUrl,
            name: comment.author!.login,
          },
          body: await parseComment(comment.body),
          createdAt: formatDate(comment.createdAt),
          reactions: comment.reactions.nodes as Reaction[],
        };
      }) || []
  );

  return {
    ...frontMatter,
    isEn,
    isJa,
    url: `${siteUrl}${path}`,
    path,
    githubUrl: post.url,
    createdAt: formatDate(publishedDate.toISOString()),
    updatedAt: formatDate(post.updatedAt),
    key: `${frontMatter.lang}-${frontMatter.slug}`,
    image: frontMatter.image || `${siteUrl}/${publishedDate.getDate() % 7}.jpg`,
    html,
    author: {
      avatarUrl: post.author!.avatarUrl,
      name: post.author!.login,
    },
    reactions,
    comments,
  };
};
