const showdown = require("showdown");

export const mdToHtml = (text: string) => {
  const converter = new showdown.Converter();
  return converter.makeHtml(text);
};
