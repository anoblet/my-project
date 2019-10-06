import { css } from "lit-element";

export default css`
  :host {
    flex: 1;
  }

  [slot="title"] a {
    color: inherit;
  }

  h3,
  h4 {
    margin-block-start: 0;
    margin-block-end: 0;
    color: #81d4fa;
  }
`;
