import { LitElement, css, customElement, html } from "lit-element";
import GlobalStyle from "../GlobalStyle";
import "./PatreonComponent";

const Style = css`
  :host {
    flex: 1;
  }

  grid-component > .grid-item {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  /*
  grid-component {
    flex: 1;
    height: 100%;
  } */

  .material-icons {
    display: block;
    padding: 1em;
    text-align: center;
  }

  .label {
    display: block;
    padding: var(--padding);
  }

  .grid-item > a:hover !important {
    text-decoration: none;
  }
`;

@customElement("page-static")
export class PageStatic extends LitElement {
  public static styles = [GlobalStyle, Style];

  public render() {
    let version = 1;
    return html`
      ${version === 2
        ? html`
            <grid-component style="grid-template-columns: repeat(3, 1fr)">
              <div class="grid-item">
                <div class="item">
                  <span class="label"
                    ><h1><a href="/readme">Readme</a></h1></span
                  >
                  <i class="material-icons">notes</i>
                </div>
              </div>
              <div class="grid-item">
                <div class="item">
                  <span class="label"
                    ><h1><a href="/blog">Blog</a></h1></span
                  >
                  <i class="material-icons">create</i>
                </div>
              </div>
              <div class="grid-item">
                <div class="item">
                  <span class="label"
                    ><h1><a href="/Performance">Performance</a></h1></span
                  >
                  <i class="material-icons">show_chart</i>
                </div>
              </div>
            </grid-component>
          `
        : ""}
      ${version === 1
        ? html`
            <grid-component>
              <card-component title="Components">
                Best guys in the game:
                <a href="https://open-wc.org/">open-wc</a>
              </card-component>
              <card-component title="Welcome">
                If you're looking for content go to the
                <a href="/blog">blog</a>. To view the performance of the app,
                visit <a href="/performance">performance</a>.
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
