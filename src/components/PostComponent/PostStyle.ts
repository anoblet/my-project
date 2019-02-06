import { css } from "lit-element";

export default css`
  grid-component {
    grid-template-columns: 1fr !important;
  }

  .field {
    margin-bottom: 1em;
    display: flex;
  }

  .field > label, input {
    flex: 1;
  }

  .field[pell] {
    grid-column span 2;
  }
`;
