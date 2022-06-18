type Post = {
  slug: string;
  content: string;
  title: string;
  date: string;
  isoDate: string;
  formattedDate: string;
  tags: string[];
  summary: string;
  lang: "ja" | "en";
  image?: string;
  key: string;
  path: string;
  url: string;
};
