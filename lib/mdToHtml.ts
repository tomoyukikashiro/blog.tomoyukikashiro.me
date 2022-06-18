import { remark } from "remark";
// import html from "remark-html";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkRehype from "remark-rehype";
import remarkBreaks from "remark-breaks";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypePrism from "rehype-prism-plus";

const markdownToHtml = async (markdown: string) => {
  const result = await remark()
    .use(remarkBreaks)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
};

export default markdownToHtml;
