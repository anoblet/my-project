import { css } from "lit-element";

export default css`
  :host {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  :host > grid-component > * {
    display: flex;
    justify-content: center;
  }

  :host #input {
    justify-content: center;
  }

  input {
    border: 0;
    border-bottom: 1px solid #fff;
    background: inherit;
    padding: 1em;
    color: var(--text-color);
    text-align: center;
  }

  input:focus {
    outline: none;
  }
`;
