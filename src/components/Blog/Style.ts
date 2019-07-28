import { css } from "lit-element";

export default css`
  :host {
    overflow-x: hidden;
    flex: 1;
  }

  [slot="title"] a {
    color: inherit;
  }
`;
