import { css } from "lit-element";

export default css`
  :host {
    overflow-x: hidden;
    flex: 1;
  }

  [slot="title"] a {
    color: inherit;
  }

  h3 {
    margin-block-start: 0;
  }

  card-component::part(card) {
    padding-bottom: 0;
  }
`;
