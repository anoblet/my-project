import { LitElement, customElement, html } from "lit-element";

import GlobalStyle from "../GlobalStyle";

@customElement("patreon-component")
export class PatreonComponent extends LitElement {
  static styles = GlobalStyle;

  public render() {
    return html`
      Subscribe to my <a href="https://www.patreon.com/anoblet">Patreon</a>!
    `;
  }
}
