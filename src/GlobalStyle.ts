import { css } from "lit-element";
// import FluidType from "./design-systems/FluidType";

export default css`
  * {
    box-sizing: border-box;
  }

  :host {
    contain: content;
  }

  :host([hidden]) {
    display: none;
  }

  a,
  external-link::part(link) {
    color: var(--link-color);
    /* font-weight: 550; */
    text-decoration: none;
  }

  external-link::part(icon) {
    color: var(--text-color);
  }

  a:hover,
  external-link::part(link):hover {
    text-decoration: underline;
  }

  ul,
  ol {
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 1em;
  }

  [flex] {
    display: flex;
  }

  [grow] {
    flex-grow: 1;
  }

  input,
  textarea {
    background: inherit;
    color: var(--text-color);
  }

  input {
    border: 0;
  }

  input[type="text"],
  input[type="number"],
  input[type="email"] {
    border-bottom: 1px solid var(--border-color);
  }

  input:focus,
  textarea:focus {
    outline: none;
  }

  textarea {
    border: 1px solid var(--border-color);
    padding: 1em;
  }

  /* Loader */
  [task-pending],
  [task-pending] :after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
  [task-pending] {
    margin: 60px auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 1.1em solid rgba(0, 64, 64, 0.2);
    border-right: 1.1em solid rgba(0, 64, 64, 0.2);
    border-bottom: 1.1em solid rgba(0, 64, 64, 0.2);
    border-left: 1.1em solid #9e9e9e;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  [scroll] {
    overflow: auto;
  }

  .material-icons {
    font-family: "Material Icons";
    font-weight: normal;
    font-style: normal;
    font-size: 24px; /* Preferred icon size */
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;

    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;

    /* Support for IE. */
    font-feature-settings: "liga";
  }

  h3 {
    color: var(--h3-color);
  }

  h3 a {
    color: var(--link-color);
  }

  pre {
    margin: 0;
  }

  svg {
    fill: currentColor;
  }

  .flex {
    display: flex;
  }

  .icon {
    cursor: pointer;
  }

  button-component::part(button) {
    color: var(--button-color);
    padding: 1em;
  }

  header-component {
    background: var(--secondary-color);
    padding: 0 0.5rem;
  }

  card-component {
    border-width: var(--border-width);
    border-style: solid;
    border-color: var(--border-color);
    border-radius: var(--border-radius);
  }

  drawer-component::part(aside) {
    background: var(--secondary-color);
  }

  [hidden] {
    display: none;
  }

  h3,
  h4 {
    margin-block-start: 0;
    margin-block-end: 0;
  }
`;

export const absolute = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
