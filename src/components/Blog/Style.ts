import { css } from "lit-element";

export default css`
  :host {
    overflow-x: hidden;
    flex: 1;
  }

  [slot="title"] a {
    color: inherit;
  }

  h3, h4 {
    margin-block-start: 0;
    margin-block-end: 0;
    color: var(--secondary-color);
  }

  card-component::part(card) {
    border: 1px solid rgba(255,255,255, 0.5);
    border-radius: 0.5rem;
  }
`;
