import "./Ratio/Component";

import { LitElement, css, customElement, html } from "lit-element";
import { create, extension, notes, show_chart } from "@anoblet/material-icons";

import GlobalStyle from "../GlobalStyle";

const Style = css`
  :host {
    flex: 1;
  }

  #grid {
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

  .grid-item a {
    flex: 1;
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

@customElement("page-static")
export class PageHome extends LitElement {
  public static styles = [GlobalStyle, Style];

  public render() {
    return html`
      <grid-component id="grid">
        <div class="grid-item">
          <a href="/components">
            <ratio-component>
              <div class="item">
                <span class="label"><h1>Components</h1></span>
                <span class="icon">
                  ${extension}
                </span>
              </div>
            </ratio-component>
          </a>
        </div>
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
    `;
  }
}
