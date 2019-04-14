import { LitElement, css, customElement, html } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import spinner from "./Spinner2";

@customElement("loading-component")
export class LoadingComponent extends LitElement {
  static get styles() {
    return [
      GlobalStyle,
      css`
        :host {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
        }

        .loader {
          contain: layout;
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
