import { css } from "lit-element";

export default css`
  :host {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 1em 1.25em 1em 1.25em; */
    padding: 1em;
    box-shadow: var(--box-shadow);
  }

  ::slotted(#title) {
    position: absolute;
    left: 25%;
    right: 25%;
    text-align: center;
  }
`;
