import { css } from "lit-element";

export default css`
  :host {
    flex: 1;
    overflow-x: hidden;
    contain: initial;
  }

  card-component {
    border: 1px solid var(--border-color);
    display: flex;
  }

  card-component[title="Components"] {
    border: 0;
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

  #columns {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;
