import { LitElement, customElement, html, property } from "lit-element";
import GlobalStyle from "../GlobalStyle";
import "./PatreonComponent";
@customElement("page-static")
class PageStatic extends LitElement {
  @property() public template: any;

  static get styles() {
    return GlobalStyle;
  }

  public render() {
    return html`
      <grid-component>
        <card-component title="Welcome">
          Welcome! This is a static page. If you're looking for content go to
          <a href="/blog">/blog</a>. To view the timings of the app, go to
          <a href="/timings">/timings</a>.
        </card-component>
        <card-component title="Patreon">
          <patreon-component></patreon-component>
        </card-component>
      </grid-component>
    `;
  }
}
