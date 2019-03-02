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
    grid-gap: 0;
  }

  div[slot=content] {
    padding: 1em 0 0 0;
  }
`;
