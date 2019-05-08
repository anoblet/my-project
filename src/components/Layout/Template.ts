import { html } from "lit-element";
import { config } from "../../../config";
import { isSignedIn } from "../../User";
import { store } from "../../Store";
import { primaryColorSelect } from "../Theme/PrimaryColorSelect";
import { menu } from "../../assets/menu";

export default function() {
  return html``;
}

const drawer = function() {
  return html``;
};

const links = [
  {
    href: "/",
    label: "Home"
  },
  {
    href: "/blog",
    label: "Blog"
  },
  {
    href: "https://github.com/anoblet/docs",
    label: "Documentation",
    external: true
  },
  {
    href: "/components",
    label: "Components"
  },
  {
    href: "/performance",
    label: "Performance"
  },
  {
    href: "/contact",
    label: "Contact"
  },
  {
    href: "/about",
    label: "About"
  },
  {
    href: "/issue",
    label: "Report an issue"
  }
];

export const navigation = function() {
  return html`
    <ul>
      ${links.map(
        ({ href, label, external }) =>
          html`
            <li>
              ${!external
                ? html`
                    <a href=${href}>${label}</a>
                  `
                : html`
                    <a href=${href} target="_blank">${label}</a>
                  `}
            </li>
          `
      )}
    </ul>
  `;
};

export const header = function() {
  return html`
    <span id="menu" @click="${this._toggleDrawer}">
      ${menu}
    </span>
    <span id="title"><a href="/">${config.site.title}</a></span>
    ${isSignedIn()
      ? html`
          <span
            class="circle"
            id="userProfile"
            mini
            label="Account"
            @click="${() => this._toggleProfile()}"
          >
          </span>
        `
      : html`
          <div id="right">
            <grid-component style="grid-template-columns: repeat(2, 1fr)">
              <div style="display: flex; align-items: center;">
                ${false ? primaryColorSelect : html``}
              </div>
              <a href="/user/signin"
                ><button-component>Sign in</button-component></a
              >
            </grid-component>
          </div>
        `}
    <div slot="choose-theme">1</div>
  `;
};
