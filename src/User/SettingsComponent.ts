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
    if (this.state) {
      if (state.user.signedIn) {
        this.watchDocumentNew({ path: "" }, (document: any) => {
          if (document) {
            this.setState(document, "theme");
          }
          resolve();
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
                    name="${setting.name}"
                    type="checkbox"
                    @click="${
                      (e: any) => {
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
    if (state.user.signedIn) {
      if (state.settings) {
        this.setDocumentNew({
          path: `users/${state.user.uid}/settings/default`
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
