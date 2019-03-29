import { LitElement, css, customElement, html } from "lit-element";
import GlobalStyle from "../GlobalStyle";
import "./PatreonComponent";

const Style = css`
  :host {
    flex: 1;
  }

  grid-component > div,
  grid-component > span {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }

  grid-component {
    flex: 1;
    height: 100%;
  }

  .material-icons {
    display: block;
    padding: 1em;
    text-align: center;
  }

  .label {
    display: block;
    padding: var(--padding);
  }
`;

@customElement("page-static")
export class PageStatic extends LitElement {
  public static styles = [GlobalStyle, Style];

  public render() {
    const version = 2;
    return html`
      ${version === 2
        ? html`
            <grid-component style="grid-template-columns: repeat(2, 1fr)">
              <div class="grid-item">
                <div class="item">
                  <i class="material-icons">create</i
                  ><span class="label">Blog</span>
                </div>
              </div>
              <div class="grid-item">
                <div class="item">
                  <i class="material-icons">show_chart</i
                  ><span class="label">Performance</span>
                </div>
              </div>
            </grid-component>
          `
        : ""}
      ${version !== 2
        ? html`
            <grid-component>
              <card-component title="Welcome">
                If you're looking for content go to
                <a href="/blog">our blog</a>. To view the performance of the
                app, visit <a href="/performance">performance</a>.
              </card-component>
              <card-component title="Patreon">
                <patreon-component></patreon-component>
              </card-component>
            </grid-component>
          `
        : ""}
    `;
  }
}
