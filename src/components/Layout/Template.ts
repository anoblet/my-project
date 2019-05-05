import { html } from "lit-element";

export default function() {
  return html``;
}

export const drawer = function() {
  return html`
    <grid-component
      ><ul>
        <li><a href="/">Home</a></li>
        <li><a href="/blog">Blog</a></li>
        <li>
          <a href="https://github.com/anoblet/docs" target="_blank"
            >Documentation</a
          >
        </li>
        <li><a href="/components">Components</a></li>
        <li><a href="/performance">Performance</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/issue">Report an issue</a></li>
      </ul></grid-component
    >
  `;
};
