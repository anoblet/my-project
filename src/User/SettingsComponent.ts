import * as style from "./SettingsComponent.scss";

import { LitElement, html, property } from "lit-element";

import { Mixin } from "../../packages/Mixin";
import { FirebaseMixin } from "../../packages/FirebaseMixin";
import { StateMixin } from "../../packages/StateMixin";
import { connect } from "pwa-helpers/connect-mixin.js";
import { settings } from "./Settings";
import { store } from "../store";
import { until } from "lit-html/directives/until";
import { getDocument, updateDocument } from "../../packages/firebase-helpers";

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
        getDocument({
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
    const state = store.getState();
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
                      (e: any) => {
                        const state: any = {};
                        state[setting.name] = e.target.checked;
                        this.setState(state, "settings");
                      }
                    }"
                  /><span class="description">${setting.description}</span>
                `;
              case Number: {
                return html`
                  <label>${setting.label}</label
                  ><input
                    ?checked="${this.state.settings[setting.name]}"
                    name="${setting.name}"
                    type="number"
                    @input="${
                      (e: any) => {
                        const state: any = {};
                        state[setting.name] = e.target.value;
                        this.setState(state, "settings");
                      }
                    }"
                  /><span class="description">${setting.description}</span>
                `;
              }
              case "select": {
                return html`
                  <label>${setting.label}</label>
                  <select
                    name="${setting.name}"
                    @input="${
                      (e: any) => {
                        const state: any = {
                          [setting.name]:
                            e.target.options[e.target.selectedIndex].value
                        };

                        this.setState(state, "settings");
                      }
                    }"
                    >${
                      setting.options.map(
                        (option: any) =>
                          html`
                            <option
                              ?selected="${
                                state.app.settings[option.name] == option.value
                              }"
                              value="${option.value}"
                              >${option.label}</option
                            >
                          `
                      )
                    }</select
                  ><span class="description">${setting.description}</span>
                `;
              }
            }
          })
        }
      </form>
    `;
  }

  stateChanged(state: any) {
    super.stateChanged(state);
    if (state.user.signedIn) {
      if (state.settings) {
        // Updates a document too many times
        // updateDocument({
        //   path: `users/${state.user.uid}/settings/default`,
        //   data: state.settings
        // });
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
