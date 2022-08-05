import type { NextApiRequest, NextApiResponse } from "next";
import { timingSafeEqual } from "crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // ?secret=xxxx&path=/path/to/revalidate1
  const { secret, path } = req.query as {
    secret: string | undefined;
    path: string | undefined;
  };
  if (
    !path ||
    !secret ||
    !timingSafeEqual(
      Buffer.from(secret),
      Buffer.from(process.env.REVALIDATE_TOKEN)
    )
  ) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate(path);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
