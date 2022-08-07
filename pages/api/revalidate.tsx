import type { NextApiRequest, NextApiResponse } from "next";
import { timingSafeEqual } from "crypto";
import { getIssueByNumber } from "../../lib/github-client";
import { parseFrontmatter } from "../../lib/parser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { issue, secret } = req.body as { issue: number; secret: string };
  if (
    !issue ||
    !secret ||
    !timingSafeEqual(
      Buffer.from(secret),
      Buffer.from(process.env.REVALIDATE_TOKEN)
    )
  ) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const body = await getIssueByNumber(issue);
  if (!body) return res.status(401).json({ message: "Invalid issue number" });
  const frontmatter = await parseFrontmatter(body);
  const isJa = frontmatter.lang === "ja-JP";
  const path = isJa
    ? `/ja-JP/post/${frontmatter.slug}`
    : `/post/${frontmatter.slug}`;

  try {
    await res.revalidate(path);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
