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
    border-bottom: 1px solid var(--background-color);
    position: relative;
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

  li > a {
    display: flex;
    flex: 1;
    padding: 0.75em 0.5em;
    padding-right: 3em;
  }

  li:hover > a:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.05;
    z-index: -1;
    background: var(--primary-color);
  }
`;
