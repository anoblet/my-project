import { css } from "lit-element";
import globalStyle from "../../GlobalStyle";

export default [
  globalStyle,
  css`
    #form grid-component {
      grid-template-columns: 1fr !important;
    }
  `
];
