import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/ar/login", "/en/login", "/ar/register", "/en/register"] }, sitemap: "https://www.mersal-ngo.org/sitemap.xml" };
}
