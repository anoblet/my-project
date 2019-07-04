import "./PatreonComponent";

import { LitElement, css, customElement, html } from "lit-element";

import GlobalStyle from "../GlobalStyle";
import { create, notes, show_chart } from "../Icons";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import "./Ratio/Component";

const readme = require("../../README.md");

const Style = css`
  :host {
    flex: 1;
    overflow-x: hidden;
  }

  #item-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  grid-component > .grid-item {
    display: flex;
    flex: 1;
    justify-content: center;
    border: 1px solid var(--border-color);
    padding: 1em;
    border-radius: 0.25em;
  }

  .material-icons {
    display: block;
    padding: 1em;
    text-align: center;
  }

  .label {
    display: block;
    text-align: center;
  }

  .grid-item a:hover {
    text-decoration: none;
  }

  li {
    padding: 0.5em 0px;
  }

  pre {
    overflow-x: auto;
  }

  .icon {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    color: var(--h3-color);
    padding: var(--padding);
  }

  svg {
    fill: currentColor;
    width: 25%;
    height: 25%;
  }

  .item {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  h1 {
    margin: 0;
  }
`;

const version = () => 2;

@customElement("page-static")
export class PageStatic extends LitElement {
  public static styles = [GlobalStyle, Style];

  public render() {
    return html`
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
      ${version() === 2
        ? html`
            <grid-component id="item-grid">
              <div class="grid-item">
                <a href="/readme">
                  <ratio-component>
                    <div class="item">
                      <span class="label"><h1>Readme</h1></span>
                      <span class="icon">
                        ${notes}
                      </span>
                    </div>
                  </ratio-component>
                </a>
              </div>
              <div class="grid-item">
                <a href="/blog">
                  <ratio-component>
                    <div class="item">
                      <span class="label"><h1>Blog</h1></span>
                      <span class="icon">
                        ${create}
                      </span>
                    </div></ratio-component
                  ></a
                >
              </div>
              <div class="grid-item">
                <a href="/Performance">
                  <ratio-component>
                    <div class="item">
                      <span class="label"><h1>Performance</h1></span>
                      <span class="icon">
                        ${show_chart}
                      </span>
                    </div></ratio-component
                  ></a
                >
              </div>
            </grid-component>
          `
        : ""}
      ${version() === 4
        ? html`
            ${unsafeHTML(readme)}
          `
        : ""}
    `;
  }
}
