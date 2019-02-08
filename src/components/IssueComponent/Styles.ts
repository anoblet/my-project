import { css } from "lit-element";
import globalStyle from "../../GlobalStyle";

export default [
  globalStyle,
  css`
    #form grid-component {
      grid-template-columns: 1fr !important;
    }

    #form grid-component .field {
      display: grid;
      grid-gap: 1em;
    }
  `
];
