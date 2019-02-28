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
    background: var(--secondary-color);
    color: var(--background-color);
    border-radius: 50%;
    margin: 1em;
  }

  .item:not(#home) {
    margin: 0.5em;
    opacity: 0.33;
  }

  .item:not(#home):hover {
    opacity: 1;
  }

  mwc-fab {
    --mdc-theme-on-secondary: var(--background-color);
  }

  mwc-fab:not(#home) {
    margin: 0.5em;
    opacity: 0.33;
  }

  mwc-fab:not(#home):hover {
    opacity: 1;
  }
`;
