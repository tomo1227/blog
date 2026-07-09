import { JSDOM } from "jsdom";

type OgpKey = "title" | "description" | "image" | "url";
type Ogp = {
  title: string;
  description: string;
  image: string;
  url: string;
  imageAlt?: string;
  favicon?: string;
};
export const fetchOgp = async (url: string) => {
  const ogp: Ogp = {
    title: "",
    description: "",
    image: "",
    url: "",
  };
  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; OGPFetcher/1.0)",
      },
    });
    if (!response.ok) return;
    const html = await response.text();
    const dom = new JSDOM(html);
    const host = new URL(url).host;
    ogp.favicon = `https://www.google.com/s2/favicons?domain=${host}&sz=20`;
    ogp.url = url;
    const metas = dom.window.document.getElementsByTagName("meta");

    Array.from(metas).forEach((v) => {
      const prop = v.getAttribute("property");
      if (!prop) return;
      const key = prop.replace("og:", "");
      if (key === "image:alt") ogp.imageAlt = v.getAttribute("content") || "";
      if (!isOgpKey(key)) return;
      ogp[key] = v.getAttribute("content") || "";
    });

    return ogp;
  } catch {
    return;
  }
};

function isOgpKey(key: any): key is OgpKey {
  return (
    key === "title" ||
    key === "image" ||
    key === "description" ||
    key === "url"
  );
}
