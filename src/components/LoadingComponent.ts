import { LitElement, css, customElement, html } from "lit-element";

import GlobalStyle from "../GlobalStyle";
import spinner from "./Loading/Spinner2"

@customElement("loading-component")
export class LoadingComponent extends LitElement {
  static get styles() {
    return [
      spinner
    ];
  }

  public render() {
    return html`
      <div class="loader"></div>
    `;
  }
}
