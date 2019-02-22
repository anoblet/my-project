import { html, LitElement } from "lit-element";
import { Mixin } from "../Mixin";
import { StateMixin } from "../StateMixin";
import { TaskMixin } from "../TaskMixin";
import * as style from "./DrawerAbsolute.scss";
import Template from "./DrawerAbsoluteTemplate";

export class DrawerAbsolute extends Mixin(LitElement, [StateMixin, TaskMixin]) {
  public render() {
    return html`
      <style>
        ${style}
      </style>
      ${
        !this.taskPending
          ? Template.bind(this)(this.state)
          : html`
              <my-loader></my-loader>
            `
      }
    `;
  }
}

window.customElements.define("app-drawer-absolute", DrawerAbsolute);
