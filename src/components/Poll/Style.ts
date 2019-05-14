import { css } from "lit-element";

export default css`
  :host {
    position: relative;
    display: flex;
    flex: 1;
  }

  #actions {
    display: grid;
    grid-template-columns: repeat(2, max-content);
    grid-gap: 1em;
    justify-content: flex-end;
  }

  .icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  svg {
    fill: currentColor;
  }

  #title-container {
    grid-template-columns: max-content max-content;
  }
`;
