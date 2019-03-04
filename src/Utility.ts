export const isTrue = (expression: any, callback: any) => {
  return expression ? callback : "";
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

export const isEmpty = (obj: any) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

const randomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
