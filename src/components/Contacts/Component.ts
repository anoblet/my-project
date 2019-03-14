import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

@customElement("contacts-component")
export class Contacts extends LitElement {
  @property() history = [];

  static get styles() {
    return [GlobalStyle, Style];
  }
  public render() {
    return Template.bind(this)();
  }

  public in() {
    firebase.update({path: "", data})
  }

  public out() {}
}
