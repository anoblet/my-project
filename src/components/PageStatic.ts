import { LitElement, css, customElement, html } from "lit-element";
import GlobalStyle from "../GlobalStyle";
import "./PatreonComponent";

const Style = css`
  :host {
    flex: 1;
  }

  :host > span {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }

  grid-component {
    flex: 1;
    height: 100%;
  }
`;

@customElement("page-static")
export class PageStatic extends LitElement {
  public static styles = [GlobalStyle, Style];

  public render() {
    const version = 2;
    return html`
      <grid-component>
        ${version === 2
          ? html`
              <grid-component style="grid-template-columns: repeat(2, 1fr)">
                <span>1</span><span>2</span>
              </grid-component>
            `
          : ""}
        ${version !== 2
          ? html`
              <card-component title="Welcome">
                If you're looking for content go to
                <a href="/blog">our blog</a>. To view the performance of the
                app, visit <a href="/performance">performance</a>.
              </card-component>
              <card-component title="Patreon">
                <patreon-component></patreon-component>
              </card-component>
            `
          : ""}
      </grid-component>
    `;
  }
}
