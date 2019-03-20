import { css } from "lit-element";

export default css`
  button {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    background: inherit;
    border: 1px solid var(--primary-color);
    padding: var(--padding);
    color: var(--button-color);
  }
`;
