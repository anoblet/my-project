import { css } from "lit-element";

export default css`
  * {
    box-sizing: border-box;
  }

  :host {
    flex: 1;
    position: relative;
  }

  grid-component {
    grid-gap: var(--grid-gap);
  }
`;
