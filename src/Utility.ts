import { html } from "lit-element";

export const isTrue = (expression: any, callback: any) => {
  return expression ? callback : html``;
};

export const find = (path: string, object: any) => {
  const parts = path.split("/");
  let value = object;
  try {
    parts.map((part: string) => {
      if (!value[part]) throw false;
      value = value[part];
    });
  } catch (error) {
    value = error;
  }
  return value;
};
