import * as style from "./PostComponent.scss";

import { LitElement, html, property } from "@polymer/lit-element";

import { until } from "lit-html/directives/until";

export class PostsComponent extends LitElement {
  model = "posts";

  render() {
    return html`
      ${
        until(
          import("./PostsComponentTemplate.ts").then(module =>
            module.default.bind(this)(this)
          )
        )
      }
    `;
  }
}

window.customElements.define("posts-component", PostsComponent);
