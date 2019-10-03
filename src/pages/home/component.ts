import { LitElement, customElement } from "lit-element";

import globalStyle from "../../GlobalStyle";
import style from "./style";
import template from "./template";

@customElement("page-home")
export class PageHome extends LitElement {
  public static styles = [globalStyle, style];
  public render = template.bind(this);
}
