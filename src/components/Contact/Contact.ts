import { LitElement, customElement, html } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";
import { toast } from "../Toast/Toast";

@customElement("contact-component")
export class Contact extends LitElement {
  public send() {
    setTimeout(() => toast("Our email has not been set up yet :/"), 2000);
  }

  public static styles = [GlobalStyle, Style];

  public render() {
    return Template.bind(this)()
  }
}
