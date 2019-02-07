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

  ul, ol {
    /* margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 1em; */
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

  input[type=text], input[type=number], input[type=email] {
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
`;
