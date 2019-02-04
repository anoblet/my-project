// Using a regular function instead of an arrow function allow us to bind (this) and retain context
export const strToTag = function(str: string, tag: any) {
  return new Function("tag", "return tag`" + str + "`");
};
