import(/* webpackChunkName: "MWCFab" */ "@material/mwc-fab");

import GlobalStyle from "../../GlobalStyle";
import { LitElement, css } from "lit-element";
import { Mixin } from "../../../packages/Mixin";
import Template from "./AppFooterTemplate";
import { TemplateMixin } from "../../../packages/TemplateMixin";

export class AppFooter extends Mixin(LitElement, [TemplateMixin]) {
  public template = Template;
  static get styles() {
    return [
      GlobalStyle,
      css`
        :host {
          display: flex;
          flex: 1;
          justify-content: center;
          align-items: center;
        }

        mwc-fab {
          --mdc-theme-on-secondary: var(--background-color);
        }

        mwc-fab:not(#home) {
          margin: 0.5em;
          opacity: 0.33;
        }

        mwc-fab:not(#home):hover {
          opacity: 1;
        }
      `
    ];
  }
}

window.customElements.define("app-footer", AppFooter);
