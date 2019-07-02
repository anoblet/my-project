import { LitElement, css, customElement, html } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import GlobalStyle from "../GlobalStyle";
import "./PatreonComponent";
const readme = require("../../README.md");

const Style = css`
  :host {
    flex: 1;
    overflow-x: hidden;
  }

  grid-component > .grid-item {
    display: flex;
    flex: 1;
    justify-content: center;
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

  .grid-item > a:hover !important {
    text-decoration: none;
  }

  li {
    padding: 0.5em 0px;
  }

  pre {
    overflow-x: auto;
  }
`;

const version = () => 2;

@customElement("page-static")
export class PageStatic extends LitElement {
  public static styles = [GlobalStyle, Style];

  public render() {
    return html`
      ${version() === 4
        ? html`
            ${unsafeHTML(readme)}
          `
        : ""}
      ${version() === 2
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
      ${version() === 1
        ? html`
            <grid-component>
              <card-component title="Welcome">
                Check out our <a href="/components">Components</a> See what's
                new on our <a href="/blog">Blog</a> See the
                <a href="/performance">Performance</a> Empty cache and hard
                reload is needed to see new content
              </card-component>
              <card-component title="Outstanding issues">
                <ul>
                  <li>
                    [ ] Route "/user-settings" is broken for anonymous/guest
                  </li>
                  <li>
                    [ ] Function /user-theme/randomTheme" Is broken for
                    anonymous/guest
                  </li>
                  <li>
                    [x] Fix collapse/expand arrows on card
                    (/components/eye-exam)
                  </li>
                  <li>
                    [] Add featured themes
                  </li>
                </ul>
              </card-component>
              <card-component title="Open WC">
                Best guys in the game:
                <a href="https://open-wc.org/">Open WC</a>
              </card-component>
              <!-- <card-component title="Heroes"> -->
              <!-- @justin @bennyp @dakMoR @lars @westbrook @john @captaincodeman -->
              <!-- </card-component> -->
              <card-component title="Patreon">
                <patreon-component></patreon-component>
              </card-component>
            </grid-component>
          `
        : ""}
    `;
  }
}
