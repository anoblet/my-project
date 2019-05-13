import { css } from "lit-element";

export default css`
  :host {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--background-color);
  }

  :host([fixed]) {
    position: fixed;
    top: 5%;
    left: 5%;
    right: 5%;
    bottom: 5%;
    background: var(--background-color);
    border: 1px solid var(--border-color);
  }

  #title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  svg {
    fill: currentColor;
  }

  #close-button {
    display: flex;
    align-items: center;
  }

  .icon {
    cursor: pointer;
  }
`;
