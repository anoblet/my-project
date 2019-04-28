import { css } from "lit-element";

export default css`
  :host {
    contain: content;
  }

  :host([hidden]) {
    display: none;
  }

  a {
    color: var(--link-color);
    /* font-weight: 550; */
    text-decoration: none;
  }

  a:hover {
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

  /* https://andy-bell.design/wrote/custom-property-controlled-fluid-type-sizing/ */
  .fluid-type {
    --fluid-type-min-size: 1;
    --fluid-type-max-size: 2;
    --fluid-type-min-screen: 20;
    --fluid-type-max-screen: 88;

    font-size: calc(
      (var(--fluid-type-min-size) * 1rem) +
        (var(--fluid-type-max-size) - var(--fluid-type-min-size)) *
        (100vw - (var(--fluid-type-min-screen) * 1rem)) /
        (var(--fluid-type-max-screen) - var(--fluid-type-min-screen))
    );
  }

  /*
* SET LOCKS ON ELEMENTS
*/
  h1.fluid-type {
    --fluid-type-min-size: 2;
    --fluid-type-max-size: 4;
  }

  h2.fluid-type {
    --fluid-type-min-size: 1.5;
    --fluid-type-max-size: 2.2;
  }

  blockquote.fluid-type {
    --fluid-type-min-size: 1.2;
    --fluid-type-max-size: 1.8;
  }

  /*
* PRESENTATION STYLES
*/
  body {
    font-family: "Source Sans Pro", sans-serif;
    background: #f3f3f3;
    color: #141414;
    padding: 4rem 2rem;
    line-height: 1.4;
  }

  h1,
  h2,
  h3 {
    line-height: 1.2;
  }

  p {
    font-size: 1.25rem;
    max-width: 75ch;
  }

  h1,
  h2,
  h3,
  blockquote {
    font-family: "Libre Baskerville", serif;
  }

  blockquote {
    font-weight: 400;
    font-style: italic;
    line-height: 1.6;
  }

  blockquote p {
    font-size: 1em;
  }

  article {
    max-width: 50rem;
    margin: 0 auto;
  }

  article > * + * {
    margin-top: 1.8em;
  }

  hr {
    border: none;
    height: 1px;
    background: #ccc;
    margin: 3em auto;
    max-width: 30rem;
  }
`;
