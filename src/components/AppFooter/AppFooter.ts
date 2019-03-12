import { LitElement, customElement } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./AppFooterTemplate";

const test = "app-footer"

@customElement(test)
export class AppFooter extends LitElement {
  public template = Template;
  static get styles() {
    return [GlobalStyle, Style];
  }

  public render() {
    return Template.bind(this)();
  }
}
