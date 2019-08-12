import { LitElement, customElement } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";
import { toast } from "../Toast/Toast";

@customElement("contact-component")
export class Contact extends LitElement {
  public static styles = [GlobalStyle, Style];
  public render = Template.bind(this);

  public send() {
    setTimeout(() => toast("Our email has not been set up yet :/"), 2000);
  }
}
