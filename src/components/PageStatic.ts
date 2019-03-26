import { LitElement, css, customElement, html } from "lit-element";
import GlobalStyle from "../GlobalStyle";
import "./PatreonComponent";

const Style = css`
  :host {
    flex: 1;
  }
`;

@customElement("page-static")
export class PageStatic extends LitElement {
  static styles = [GlobalStyle, Style];

  public render() {
    return html`
      <grid-component>
        <card-component title="Welcome">
          If you're looking for content go to
          <a href="/blog">our blog</a>. To view the performance of the app,
          visit <a href="/performance">performance</a>.
        </card-component>
        <card-component title="Patreon">
          <patreon-component></patreon-component>
        </card-component>
      </grid-component>
    `;
  }
}
