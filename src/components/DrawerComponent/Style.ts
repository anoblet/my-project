import { css } from "lit-element";

export default css`
  * {
    box-sizing: border-box;
  }

  :host {
    flex: 1;
    position: relative;
    border: 1px solid var(--border-color);
    --card-inner-padding: 0;
    background: var(--background-color);
    overflow: auto;
  }

  :host > * {
    --border-color: var(--background-color);
  }

  a:hover {
    text-decoration: none;
  }

  ul {
    list-style-type: none;
  }

  li {
    padding: 0.5em 0;
    border-bottom: 1px solid var(--background-color);
  }

  li:hover {
    /* background: var(--primary-color); */
    border-bottom: 1px solid var(--primary-color);
  }

  card-component .content {
    padding: 0;
  }
`;
