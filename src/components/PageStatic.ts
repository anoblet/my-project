import { LitElement, css, customElement, html } from "lit-element";
import GlobalStyle from "../GlobalStyle";
import "./PatreonComponent";

const version = 2;

const Style = css`
  :host {
    flex: 1;
  }

  grid-component > .grid-item {
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
    return html`
      ${version === 2
        ? html`
            <grid-component style="grid-template-columns: repeat(3, 1fr)">
              <div class="grid-item">
                <a href="/readme">
                  <div class="item">
                    <i class="material-icons">notes</i
                    ><span class="label"><h1>Readme</h1></span>
                  </div></a
                >
              </div>
              <div class="grid-item">
                <a href="/blog">
                  <div class="item">
                    <i class="material-icons">create</i
                    ><span class="label"><h1>Blog</h1></span>
                  </div></a
                >
              </div>
              <div class="grid-item">
                <a href="/Performance">
                  <div class="item">
                    <i class="material-icons">show_chart</i
                    ><span class="label"><h1>Performance</h1></span>
                  </div></a
                >
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
