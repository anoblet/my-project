import { css } from "lit-element";

export default css`
  :host([hidden]) {
    display: none;
  }

  a {
    color: var(--secondary-color);
    /* font-weight: 550; */
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  ul,
  ol {
    /* margin-block-start: 0;
    margin-block-end: 0; */
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
`;
