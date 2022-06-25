export const parseLinksHeader = <T extends string>(linksHeader: string): Record<T, string> => {
  const result: Record<string, string> = {};
  const entries = linksHeader.split(",");
  const relsRegExp = /\brel="?([^"]+)"?\s*;?/;
  const keysRegExp = /(\b[0-9a-z\.-]+\b)/g;
  const sourceRegExp = /^<(.*)>/;

  for (var i = 0; i < entries.length; i++) {
    const entry = entries[i].trim();
    const rels = relsRegExp.exec(entry);
    if (rels) {
      const keys = rels[1].match(keysRegExp);
      const source = sourceRegExp.exec(entry);
      if (keys !== null && source !== null) {
        var k,
          kLength = keys.length;
        for (k = 0; k < kLength; k += 1) {
          result[keys[k]] = source[1];
        }
      }
    }
  }

  return result;
};
