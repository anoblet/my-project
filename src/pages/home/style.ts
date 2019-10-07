import { css } from "lit-element";

export default css`
  :host {
    flex: 1;
  }

  #grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  grid-component > .grid-item {
    display: flex;
    flex: 1;
    justify-content: center;
    border: 1px solid var(--border-color);
    padding: 1em;
    border-radius: var(--border-radius);
  }

  .material-icons {
    display: block;
    padding: 1em;
    text-align: center;
  }

  .label {
    display: block;
    text-align: center;
  }

  .grid-item a {
    flex: 1;
  }

  .grid-item a:hover {
    text-decoration: none;
  }

  li {
    padding: 0.5em 0px;
  }

  pre {
    overflow-x: auto;
  }

  .icon {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    color: var(--h3-color);
    padding: var(--padding);
  }

  svg {
    width: 25%;
    height: 25%;
  }

  .item {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  h1 {
    margin: 0;
  }
`;
