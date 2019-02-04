// Using a regular function instead of an arrow function allow us to bind (this) and retain context
export const strToTag = function(str: string, tag: any) {
  const result = new Function("str", "tag", "return " + tag + "`" + str + "`")();
};
