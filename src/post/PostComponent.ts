import * as style from "./PostComponent.scss";

import { LitElement, html, property } from "@polymer/lit-element";

import { until } from "lit-html/directives/until";

export class PostComponent extends LitElement {
  @property({ type: String }) id: string;
  @property({ type: String }) author: string;
  @property({ type: String }) content: string;

  render() {
    return html`
      ${
        until(
          import("./PostComponentTemplate.ts").then(module =>
            module.default.bind(this)()
          )
        )
      }
    `;
  }
}

window.customElements.define("post-component", PostComponent);
