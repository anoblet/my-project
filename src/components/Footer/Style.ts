import { css } from "lit-element";

export default css`
  :host {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }

  .material-icons {
    display: flex;
    color: var(--background-color);
  }

  .item {
    padding: 1em;
    background: var(--primary-color);
    color: var(--background-color);
    border-radius: 50%;
    margin: 1em;
  }

  .item:not(#home) {
    padding: 0.75em;
    margin: 0.5em;
    opacity: 0.33;
  }

  .item:not(#home):hover {
    opacity: 1;
  }
`;
