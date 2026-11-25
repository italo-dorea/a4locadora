import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Buscadores de IA liberados de propósito (GEO): permitem que o site seja citado nas respostas
      { userAgent: ["GPTBot", "ChatGPT-User", "OAI-SearchBot", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Google-Extended", "Applebot-Extended"], allow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
