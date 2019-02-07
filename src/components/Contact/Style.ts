import { css } from "lit-element";

export default css`
  * {
    box-sizing: border-box;
  }

  :host {
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
  }

  .card-actions {
    grid-column: 1/-1;
    display: flex;
    justify-content: flex-end;
  }
`;
