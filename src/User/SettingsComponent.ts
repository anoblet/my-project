import * as style from "./SettingsComponent.scss";

import { LitElement, html, property } from "@polymer/lit-element";

import { until } from "lit-html/directives/until";

export class SettingsComponent extends LitElement {
  @property({ type: String }) id: string;
  @property({ type: String }) author: string;
  @property({ type: String }) title: string;
  @property({ type: String }) content: string;

  render() {
    return html`
      ${
        until(
          import("./SettingsComponentTemplate.ts").then(module =>
            module.default.bind(this)()
          )
        )
      }
    `;
  }
}

window.customElements.define("settings-component", SettingsComponent);
