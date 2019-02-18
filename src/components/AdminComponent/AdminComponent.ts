import { LitElement, css, html } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import { connect } from "pwa-helpers/connect-mixin.js";
import { fields } from "./Settings";
import { store } from "../../Store";
import template from "./AdminTemplate";
import { updateDocument } from "../../../packages/firebase-helpers";

import(/* webpackChunkName: "CardComponent" */ "../CardComponent/CardComponent");
import(/* webpackChunkName: "GridComponent" */ "../GridComponent/GridComponent");

export interface AdminComponent {
  [key: string]: any; // Add index signature
}

// @customElement("admin-component")
export class AdminComponent extends Mixin(connect(store)(LitElement), [
  StateMixin
]) {
  static get styles() {
    return [
      GlobalStyle,
      css`
        :host {
          flex: 1;
        }
      `
    ];
  }

  public find(path: string, object: any) {
    const parts = path.split("/");
    let value = object;
    try {
      parts.map((part: string) => {
        if (!value[part]) throw false;
        value = value[part];
      });
    } catch (error) {
      // console.log("Could not find", path);
      value = error;
    }
    return value;
  }

  public valueChanged(e: any) {
    const state = store.getState();
    const path = `users/${state.user.uid}/settings/default`;

    const settings: any = {};
    let value;
    if (e.target.nodeName.toLowerCase() === "select") {
      value = e.target.options[e.target.selectedIndex].value;
    }
    settings[e.target.name] = value;
    updateDocument({ path, data: settings });
    // this.setState({ settings }, "app");
  }

  public stateChanged(state: any) {
    super.stateChanged();
    this.state = state;
    if (state.app.settings) {
      const path = `users/${state.user.uid}/settings/default`;
      const data = { mode: state.app.settings.mode };

      // Updates a document too many times
      // updateDocument({ path, data });
    }
  }

  public render() {
    return template.bind(this)(this.state);
    return html`
      <grid-component>
        <card-component title="Settings">
          <div slot="content">
            ${fields.map(
              (field: any) => html`
                <label>${field.label}</label>:
                ${field.type === "dropdown"
                  ? html`
                      <select
                        @input="${(e: Event) => this.valueChanged(e)}"
                        name="${field.name}"
                        >${field.options.map(
                          (option: any) =>
                            html`
                              <option
                                ?selected="${this.find(
                                  field.statePath,
                                  this.state
                                ) === option.value}"
                                value="${option.value}"
                                >${option.label}</option
                              >
                            `
                        )}
                      </select>
                    `
                  : ""}
              `
            )}
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
