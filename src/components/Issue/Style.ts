import { css } from "lit-element";
import GlobalStyle from "../../GlobalStyle";

export default [
  GlobalStyle,
  css`
    :host {
      flex: 1;
    }
    #form grid-component {
      grid-template-columns: 1fr !important;
    }

    #form grid-component .field {
      display: grid;
      grid-gap: 1em;
    }
  `
];
