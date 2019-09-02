import { css } from "lit-element";

export default css`
  #buttons {
    grid-template-columns: repeat(2, 1fr);
  }

  button-component {
    display: flex;
    flex: 1;
  }

  #log {
    grid-template-columns: auto auto max-content;
  }

  #log > div {
    display: flex;
    align-items: center;
  }

  .center {
    /* justify-content: center; */
  }
`;
