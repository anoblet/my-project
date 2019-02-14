import { LitElement, customElement, html } from "lit-element";

import GlobalStyle from "../GlobalStyle";

@customElement("loading-component")
export class LoadingComponent extends LitElement {
  static get styles() {
    return [GlobalStyle];
  }

  public render() {
    return html`
      Loading...
    `;
  }
}
