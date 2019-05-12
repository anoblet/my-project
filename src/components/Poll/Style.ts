import { css } from "lit-element";

export default css`
  :host {
    position: relative;
    display: flex;
    flex: 1;
  }

  #create-dialog:not([hidden]) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--background-color);
  }
`;
