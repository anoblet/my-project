import { LitElement, html } from "lit-element";

import { settings } from "./Settings";
import { store } from "../../Store";
import {
  getDocument,
  updateDocument
} from "../../../packages/firebase-helpers";
import { addReducer } from "../../State";
import { setState } from "../../../packages/state-helpers/state-helpers";
import { renderForm } from "../PropertyEditor/PropertyEditor";

const properties = {
  breadcrumbs : {
    type: Boolean,
    description: "Breadcrumbs",
    label: "Breadcrumbs"
  }
}

export interface SettingsComponent {
  [key: string]: any; // Add index signature
}

export class SettingsComponent extends LitElement {
  public state: any;

  constructor() {
    super();
    addReducer({ type: "settings", store });
  }

  public firstUpdated() {
    if (this.state) {
      if (this.state.user.signedIn) {
        getDocument({
          path: `users/${this.state.user.uid}/settings/default`,
          callback: (document: any) => {
            if (document) {
              setState({ data: document, type: "settings", store });
            }
          }
        });
      }
    }
  }

  public form() {
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
                    ?checked="${this.state.user.settings[setting.name]}"
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
                    value="${this.state.user.settings[setting.name]}"
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
                    ?checked="${this.state.user.settings[setting.name]}"
                    name="${setting.name}"
                    type="number"
                    @input="${(e: any) => {
                      const state: any = {};
                      state[setting.name] = e.target.value;
                      setState({ data: state, type: "settings", store });
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
                            ?selected="${state.user.settings[setting.name] ==
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

  public render() {
    return renderForm(
      this,
      properties,
      (_property: string, value: any) => (this[_property] = value)
    );
  }
}

window.customElements.define("settings-component", SettingsComponent);
