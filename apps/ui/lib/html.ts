import sanitize from "sanitize-html";
import { encode } from "html-entities";
import cheerio, { load } from "cheerio";

export const getContent = (content: string) => {
  const sanitized = sanitize(content, {
    allowedTags: sanitize.defaults.allowedTags.concat(["img", "iframe", "pre", "code"]),
    allowedAttributes: {
      a: ["href", "name", "target"],
      img: ["src", "alt"],
      iframe: ["src"],
    },
  });

  const $ = load(sanitized);

  $("pre").each((_i, t) => {
    const current = $(t);
    const text = current.text();

    const content = cheerio("pre", `<pre>${encode(text)}</pre>`);

    current.replaceWith(content);
  });

  return $.html();
};

export const getTime = (d: string) => new Date(d).getTime();
