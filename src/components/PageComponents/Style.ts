import { css } from "lit-element";

export default css`
  :host {
    flex: 1;
    overflow-x: hidden;
    contain: initial;
  }

  card-component {
    border: 1px solid var(--border-color);
  }

  card-component::part(title) {
    display: none;
  }

  .center {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }
`;
