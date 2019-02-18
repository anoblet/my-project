import { LitElement, css, customElement, html } from "lit-element";

import GlobalStyle from "../GlobalStyle";
import spinner from "./Loading/Spinner2";

@customElement("loading-component")
export class LoadingComponent extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      `,
      spinner
    ];
  }

  public render() {
    return html`
      <div class="loader">Test</div>
    `;
  }
}
