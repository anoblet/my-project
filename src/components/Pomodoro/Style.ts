import { css } from "lit-element";

export default css`
  :host {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    padding: 1em;
  }

  :host > * {
    display: flex;
    justify-content: center;
  }

  :host > #input {
    flex: 1;
    align-items: center;
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
    border-bottom: 1px solid var(--border-color);
    background: inherit;
    padding: 1em;
    color: var(--text-color);
    text-align: center;
  }

  input:focus {
    outline: none;
  }

  [flex-grow] {
    flex: 1;
  }

  #modes grid-component > * {
    text-align: center;
  }

  span {
    display: flex;
    align-items: center;
  }

  [active] {
    color: var(--primary-color);
  }

  button-component {
    --border-color: var(--background-color);
  }

  button-component::part(button) {
    outline: none;
  }

  button-component[active]::part(button) {
    font-weight: bold;
  }
`;
