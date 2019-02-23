/* tslint:disable */
const showdown = require("showdown");
/* tslint:enable */

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
