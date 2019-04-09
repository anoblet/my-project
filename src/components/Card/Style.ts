import { css } from "lit-element";

export default css`
  :host {
    --card-padding: var(--padding, 1em);
    display: grid;
    grid-gap: 1em;
    flex-direction: column;
    flex: 1;
    position: relative;
    border: var(--border-size) solid var(--border-color);
    border-radius: var(--border-radius);
    padding: var(--card-padding);
    box-shadow: var(--box-shadow);
  }

  h3,
  ::slotted(h3) {
    display: flex;
    align-items: center;
    margin-block-start: 0;
    margin-block-end: 0;
    color: var(--secondary-color);
  }

  ::slotted([slot="content"]) {
    border: var(--border-size) solid var(--border-color);
    padding: var(--card-inner-padding, 0);
    overflow-x: auto;
  }

  ::slotted([slot="actions"]) {
    display: flex;
    justify-content: flex-end;
  }

  :host([collapsed]) {
    height: min-content;
  }

  :host([collapsed]) #content {
    display: none;
  }

  #title {
    display: contents;
    align-items: center;
    justify-content: space-between;
  }

  #content {
    flex-direction: column;
    flex: 1;
  }
`;
