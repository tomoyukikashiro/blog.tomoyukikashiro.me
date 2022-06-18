import { VFC } from "react";

const headingClass = [
  "leading-tight",
  "font-semibold",
  "font-heading",
  "mb-2",
].map((c) => `prose-headings:${c}`);
const h1Class = ["text-5xl"].map((c) => `prose-h1:${c}`);
const h2Class = ["text-4xl"].map((c) => `prose-h2:${c}`);
const h3Class = ["text-3xl"].map((c) => `prose-h3:${c}`);
const h4Class = ["text-2xl"].map((c) => `prose-h4:${c}`);
const h5Class = ["text-lg"].map((c) => `prose-h5:${c}`);
const aClass = [
  "font-medium",
  "text-red-500",
  "underline",
  "hover:no-underline",
].map((c) => `prose-a:${c}`);
const pClass = ["mb-2", "text-base"].map((c) => `prose-p:${c}`);

const proseClass = [
  ...headingClass,
  ...h1Class,
  ...h2Class,
  ...h3Class,
  ...h4Class,
  ...h5Class,
  ...aClass,
  ...pClass,
].join(" ");

export const ContentBody: VFC<{ content: string }> = ({ content }) => (
  <section className="py-10">
    <div className="container px-4 mx-auto">
      <div
        className={`max-w-2xl mx-auto prose`}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  </section>
);
