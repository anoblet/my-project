import { css } from "lit-element";

export default css`
  :host {
    position: relative;
    display: flex;
    flex: 1;
  }

  #actions {
    display: flex;
  }

  .icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  svg {
    fill: currentColor;
  }
`;
