import { LitElement, css, customElement, unsafeCSS } from "lit-element";

import globalStyle from "../../GlobalStyle";
import template from "./template";

const styleImport = require("./style.css");
const style = css`
  ${unsafeCSS(styleImport)}
`;

@customElement("page-tutor")
export class PageTutor extends LitElement {
  public static styles = [globalStyle, style];
  public render = template.bind(this);
}
