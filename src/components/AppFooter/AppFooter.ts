// import(/* webpackChunkName: "MWCFab" */ "@material/mwc-fab");

import { LitElement} from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./AppFooterTemplate";

export class AppFooter extends LitElement {
  public template = Template;
  static get styles() {
    return [GlobalStyle, Style];
  }

  public render() {
    return Template.bind(this)();
  }
}

window.customElements.define("app-footer", AppFooter);
