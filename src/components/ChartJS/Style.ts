import { css } from "lit-element";

export default css`
  :host {
    display: flex;
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
