import { LitElement, customElement } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./style";
import Template from "./template";

@customElement("page-home")
export class PageHome extends LitElement {
  public static styles = [GlobalStyle, Style];
  public render = Template.bind(this);
}
