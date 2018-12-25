import * as style from "./SettingsComponent.scss";

import { LitElement, html, property } from "@polymer/lit-element";

import { Mixin } from "../../packages/Mixin";
import { FirebaseMixin } from "../../packages/FirebaseMixin";
import { StateMixin } from "../../packages/StateMixin";
import { connect } from "pwa-helpers/connect-mixin.js";
import { settings } from "./Settings";
import { store } from "../store.js";
import { until } from "lit-html/directives/until";

export class SettingsComponent extends Mixin(connect(store)(LitElement), [
  FirebaseMixin,
  StateMixin
]) {
  constructor() {
    super();
    this.setStore(store);
    this.addReducer("settings");
  }

  firstUpdated() {
    super.firstUpdated();

    if (this.state) {
      if (this.state.user.signedIn) {
        this.watchDocumentNew({
          path: `users/${this.state.user.uid}/settings/default`,
          callback: (document: any) => {
            if (document) {
              this.setState(document, "settings");
            }
          }
        });
      }
    }
  }

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
                    ?checked="${this.state.settings[setting.name]}"
                    name="${setting.name}"
                    type="checkbox"
                    @click="${
                      (e: Event) => {
                        const state: any = {};
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

  stateChanged(state: any) {
    super.stateChanged();
    this.state = state;
    if (state.user.signedIn) {
      if (state.settings) {
        this.setDocumentNew({
          path: `users/${state.user.uid}/settings/default`,
          data: state.settings
        });
      }
    }
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
