import { css } from "lit-element";

export default css`
  :host {
    display: block;
    flex-direction: column;
    flex: 1;
  }

  #container {
    position: relative;
    overflow: auto;
  }

  .absolute {
    left: 0;
    right: 0;
  }
`;
