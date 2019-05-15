import { css } from "lit-element";

export default css`
  :host {
    display: flex;
    flex: 1;
    overflow-x: hidden;
    contain: initial;
  }

  card-component {
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

  #content-grid {
    flex: 1;
  }
`;
