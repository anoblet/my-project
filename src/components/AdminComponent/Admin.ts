import { css, html, LitElement, customElement, property } from "lit-element";
import template from "./AdminTemplate";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../store";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import { updateDocument } from "../../../packages/firebase-helpers";
import GlobalStyle from "../../GlobalStyle";

import(/* webpackChunkName: "CardComponent" */ "../CardComponent/CardComponent");
import(/* webpackChunkName: "GridComponent" */ "../GridComponent/GridComponent");

const fields = [
  {
    label: "Mode",
    name: "mode",
    type: "dropdown",
    options: [
      { label: "Production", value: 0 },
      { label: "Development", value: 1 },
      { label: "Experimental", value: 2 }
    ],
    statePath: "app/settings/mode"
  }
];

export interface AdminComponent {
  [key: string]: any; // Add index signature
}

// @customElement("admin-component")
export class AdminComponent extends Mixin(connect(store)(LitElement), [
  StateMixin
]) {
  static get styles() {
    return [GlobalStyle];
  }

  constructor() {
    super();
    this.setStore(store);
    // this.addReducer("app/settings");
  }

  find(path: string, object: any) {
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
  }

  valueChanged(e: any) {
    const settings: any = {};
    let value;
    if (e.target.nodeName.toLowerCase() === "select") {
      value = e.target.options[e.target.selectedIndex].value;
    }
    settings[e.target.name] = value;
    this.setState({ settings }, "app");
  }

  stateChanged(state: any) {
    super.stateChanged();
    this.state = state;
    if (state.app.settings) {
      const path = `users/${state.user.uid}/settings/default`;
      const data = { mode: state.app.settings.mode };

      // Updates a document too many times
      // updateDocument({ path, data });
    }
  }

  render() {
    return html`
      <style></style>
      <grid-component>
        <card-component title="Settings">
          <div slot="content">
            ${
              fields.map(
                (field: any) => html`
                  <label>${field.label}</label>:
                  ${
                    field.type === "dropdown"
                      ? html`
                          <select
                            @input="${(e: Event) => this.valueChanged(e)}"
                            name="${field.name}"
                            >${
                              field.options.map(
                                (option: any) =>
                                  html`
                                    <option
                                      ?selected="${
                                        this.find(
                                          field.statePath,
                                          this.state
                                        ) == option.value
                                      }"
                                      value="${option.value}"
                                      >${option.label}</option
                                    >
                                  `
                              )
                            }
                          </select>
                        `
                      : ""
                  }
                `
              )
            }
          </div>
        </card-component>
        <card-component title="Links">
          <div slot="content">
            <ul>
              <a href="/post"><li>Posts</li></a>
            </ul>
          </div>
        </card-component>
      </grid-component>
    `;
  }
}

window.customElements.define("admin-component", AdminComponent);
