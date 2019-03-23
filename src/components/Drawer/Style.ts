import { css } from "lit-element";

export default css`
  :host {
    --drawer-background-color: var(--background-color);
    --card-inner-padding: 0;
    flex: 1;
    position: relative;
    overflow: auto;
    background: var(--drawer-background-color);
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
    border-bottom: 1px solid var(--primary-color);
  }

  card-component {
    padding-top: 0;
  }

  card-component .content {
    padding: 0;
  }
`;
