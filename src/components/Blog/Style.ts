import { css } from "lit-element";

export default css`
  :host {
    overflow-x: hidden;
  }

  [slot="title"] a {
    color: inherit;
  }
`;
