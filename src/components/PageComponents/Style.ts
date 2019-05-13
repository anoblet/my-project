import { css } from "lit-element";

export default css`
  :host {
    display: flex;
    flex: 1;
    overflow-x: hidden;
    contain: initial;
  }

  card-component {
    border: 1px solid var(--border-color);
    display: flex;
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
