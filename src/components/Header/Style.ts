import { css } from "lit-element";

export default css`
  :host {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em;
    box-shadow: var(--box-shadow);
  }

  ::slotted(#title) {
    position: absolute;
    left: 25%;
    right: 25%;
    text-align: center;
  }

  ::slotted(.circle) {
    display: flex;
    background: var(--secondary-color);
    color: var(--background-color);
    border-radius: 50%;
    margin: 1em;
    width: 32px;
    height: 32px;
  }
`;
