import "@anoblet/grid-component";
import "@anoblet/ratio-component";

import { create, extension, notes, show_chart } from "@anoblet/material-icons";

import { html } from "lit-element";

export default function() {
  return html`
    <grid-component id="grid">
      <div class="grid-item">
        <a href="/components">
          <ratio-component>
            <div class="item">
              <span class="label"><h1>Components</h1></span>
              <span class="icon">
                ${extension}
              </span>
            </div>
          </ratio-component>
        </a>
      </div>
      <div class="grid-item">
        <a href="/readme">
          <ratio-component>
            <div class="item">
              <span class="label"><h1>Readme</h1></span>
              <span class="icon">
                ${notes}
              </span>
            </div>
          </ratio-component>
        </a>
      </div>
      <div class="grid-item">
        <a href="/blog">
          <ratio-component>
            <div class="item">
              <span class="label"><h1>Blog</h1></span>
              <span class="icon">
                ${create}
              </span>
            </div></ratio-component
          ></a
        >
      </div>
      <div class="grid-item">
        <a href="/Performance">
          <ratio-component>
            <div class="item">
              <span class="label"><h1>Performance</h1></span>
              <span class="icon">
                ${show_chart}
              </span>
            </div></ratio-component
          ></a
        >
      </div>
    </grid-component>
  `;
}
