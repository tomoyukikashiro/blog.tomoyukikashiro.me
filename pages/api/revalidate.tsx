import type { NextApiRequest, NextApiResponse } from "next";
import { timingSafeEqual } from "crypto";
import { getIssueByNumber } from "../../lib/github-client";
import { parseFrontmatter } from "../../lib/parser";

const getPathByNumber = async (number: number): Promise<string | null> => {
  const body = await getIssueByNumber(number);
  if (!body) return null;
  const frontmatter = await parseFrontmatter(body);
  const isJa = frontmatter.lang === "ja-JP";
  return isJa ? `/ja-JP/post/${frontmatter.slug}` : `/post/${frontmatter.slug}`;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { issue, secret } = req.body as { issue: number; secret: string };

  if (
    !timingSafeEqual(
      Buffer.from(secret),
      Buffer.from(process.env.REVALIDATE_TOKEN)
    )
  ) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const path = issue ? await getPathByNumber(issue) : "/";
  if (!path) return res.status(401).json({ message: "Invalid issue number" });

  try {
    await res.revalidate(path);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
