import { css } from "lit-element";

export default css`
  :host {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }

  :host > * {
    padding: 1em;
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
