import type { APIRoute } from "astro";
import { caseStudies, siteConfig } from "../content/site";
export const GET: APIRoute = () =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["/", "/case-studies/", "/privacy/", ...caseStudies.map((c) => `/case-studies/${c.id}/`)].map((path) => `<url><loc>${siteConfig.url}${path}</loc></url>`).join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml" } },
  );
