import * as style from "./SettingsComponent.scss";

import { LitElement, html, property } from "@polymer/lit-element";

import { settings } from "./Settings";
import { until } from "lit-html/directives/until";

export class SettingsComponent extends LitElement {
  form() {
    return html`
      <form>
        ${
          settings.map((setting: any) => {
            switch (setting.type) {
              case Boolean:
                return html`
                  <label>${setting.label}</label
                  ><input
                    name="${setting.name}"
                    type="checkbox"
                    @click="${
                      (e: any) => {
                        const state = {};
                        state[setting.name] = e.target.checked;

                        this.setState(state, "settings");
                      }
                    }"
                  />
                `;
            }
          })
        }
      </form>
    `;
  }

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
