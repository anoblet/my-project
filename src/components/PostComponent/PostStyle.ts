import { css } from "lit-element";

export default css`
  grid-component {
    grid-template-columns: 1fr !important;
  }

  .field {
    margin-bottom: 1em;
  }

  .field[pell] {
    grid-column span 2;
  }
`;
