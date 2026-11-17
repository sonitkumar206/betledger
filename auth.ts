import crypto from "node:crypto";

const SITE_PASSWORD = process.env.SITE_PASSWORD || "Royals2025";
const validTokens = new Set<string>();

export default function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { password } = req.body ?? {};

  if (password === SITE_PASSWORD) {
    const token = crypto.randomBytes(32).toString("hex");
    validTokens.add(token);
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: "Incorrect password" });
}
