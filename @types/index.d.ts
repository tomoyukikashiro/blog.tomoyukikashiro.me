interface FrontMatter {
  title: string;
  slug: string;
  lang: "ja-JP" | "en-US";
  tags?: string[];
  date: string;
  summary?: string;
  image?: string;
}

interface Reaction {
  id: string;
  content:
    | "HOORAY"
    | "HEART"
    | "THUMBS_UP"
    | "THUMBS_DOWN"
    | "LAUGH"
    | "CONFUSED"
    | "ROCKET"
    | "EYES";
}

interface PostComment {
  id: string;
  author: Author;
  body: string;
  createdAt: string; // 2022-07-19T09:56:10Z
  reactions: Reaction[];
}

interface Author {
  avatarUrl: string;
  name: string;
}

interface Post extends Omit<FrontMatter, "date" | "image"> {
  isEn: boolean;
  isJa: boolean;
  url: string;
  path: string;
  githubUrl: string;
  createdAt: string;
  updatedAt: string; // 2022-07-19T09:56:10Z
  key: string;
  image: string;
  html: string;
  author: Author;
  comments: PostComment[];
  reactions: Reaction[];
}
