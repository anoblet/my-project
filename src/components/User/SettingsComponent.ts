import * as style from "./SettingsComponent.scss";

import { LitElement, html, property } from "lit-element";

import { Mixin } from "../../../packages/Mixin";
import { FirebaseMixin } from "../../../packages/FirebaseMixin";
import { StateMixin } from "../../../packages/StateMixin";
import { connect } from "pwa-helpers/connect-mixin.js";
import { settings } from "./Settings";
import { store } from "../../Store";
import { until } from "lit-html/directives/until";
import { getDocument, updateDocument } from "../../../packages/firebase-helpers";

const find = (path: string, object: any) => {
  const parts = path.split("/");
  let value = object;
  try {
    parts.map((part: string) => {
      if (!value[part]) throw false;
      value = value[part];
    });
  } catch (error) {
    console.log("Could not find", path);
    value = error;
  }
  return value;
};

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
        <grid-component style="grid-template-columns: 1fr 1fr;">
          ${settings.map((setting: any) => {
            switch (setting.type) {
              case Boolean:
                return html`
                  <label>${setting.label} (${setting.description})</label
                  ><input
                    ?checked="${this.state.settings[setting.name]}"
                    name="${setting.name}"
                    type="checkbox"
                    @click="${(e: any) => {
                      const state = store.getState();
                      const path = `users/${state.user.uid}/settings/default`;
                      const data: any = {};
                      data[setting.name] = e.target.checked;
                      updateDocument({ path, data });
                    }}"
                  />
                `;
              case String:
                return html`
                  <label>${setting.label} (${setting.description})</label
                  ><input
                    value="${this.state.settings[setting.name]}"
                    name="${setting.name}"
                    type="text"
                    @change="${(e: any) => {
                      const state = store.getState();
                      const path = `users/${state.user.uid}/settings/default`;
                      const data: any = {};
                      data[setting.name] = e.target.value;
                      updateDocument({ path, data });
                    }}"
                  />
                `;
              case Number: {
                return html`
                  <label>${setting.label} (${setting.description})</label
                  ><input
                    ?checked="${this.state.settings[setting.name]}"
                    name="${setting.name}"
                    type="number"
                    @input="${(e: any) => {
                      const state: any = {};
                      state[setting.name] = e.target.value;
                      this.setState(state, "settings");
                    }}"
                  />
                `;
              }
              case "select": {
                return html`
                <label>${setting.label} (${setting.description})</label
                  <select
                    name="${setting.name}"
                    @input="${(e: any) => {
                      const data: any = {
                        [setting.name]:
                          e.target.options[e.target.selectedIndex].value
                      };
                      const state = store.getState();
                      const path = `users/${state.user.uid}/settings/default`;
                      updateDocument({ path, data });
                      // this.setState(state, "settings");
                    }}"
                    >${setting.options.map(
                      (option: any) =>
                        html`
                          <option
                            ?selected="${state.settings[setting.name] ==
                              option.value}"
                            value="${option.value}"
                            >${option.label}</option
                          >
                        `
                    )}</select
                  >
                `;
              }
            }
          })}
        </grid-component>
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
      ${until(
        import("./SettingsComponentTemplate.ts").then(module =>
          module.default.bind(this)()
        )
      )}
    `;
  }
}

window.customElements.define("settings-component", SettingsComponent);
