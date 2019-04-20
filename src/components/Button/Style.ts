import { css } from "lit-element";

export default css`
  button {
    display: flex;
    flex: 1;
    justify-content: center;
    background: inherit;
    border: 1px solid var(--primary-color);
    padding: var(--button-padding, 1em);
    color: var(--button-color);
    border-radius: var(--border-radius);
  }
`;
