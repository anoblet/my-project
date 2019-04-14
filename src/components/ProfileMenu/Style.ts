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
    box-shadow: var(--box-shadow);
  }

  ul {
    list-style-type: none;
    padding-inline-start: 0;
  }

  li {
    padding: 0.25em 0;
  }
`;
