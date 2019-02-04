const showdown = require("showdown");

/**
 * [Converter description]
 * @return [description]
 *
 * Usage: ${unsafeHTML(mdToHtml("* Test"))}
 */

export const mdToHtml = (text: string) => {
  const converter = new showdown.Converter();
  return converter.makeHtml(text);
};
