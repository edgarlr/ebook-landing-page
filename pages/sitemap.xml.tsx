import { SITE_URL } from "lib/constants";
import { NextPageContext } from "next";
import { getAllEbooks } from "lib/api";

const createSitemap = (ebooks: TEbook[]) => `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
  </url>
  ${ebooks.map(({ slug }) => `
    <url>
      <loc>${`${SITE_URL}/ebooks/${slug}`}</loc>
    </url>
  `).join("")}
  </urlset>
`;

export async function getServerSideProps({ res }: NextPageContext) {
  const ebooks = getAllEbooks();
  res?.setHeader("Content-Type", "text/xml");
  res?.write(createSitemap(ebooks));

  res?.end();
  return {
    props: {}, // will be passed to the page component as props
  };
}

// Nullish component
export default () => null;
