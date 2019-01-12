import { css } from "lit-element";

let theme = {
  backgroundColor: css`white`,
  textColor: css`black`
};

export const setTheme = (newTheme: any) => {
  theme = newTheme;
};

export const getTheme = () => theme;
