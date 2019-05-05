import { html } from "lit-element";

export default function() {
  return html``;
}

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

export const drawer = function() {
  return html`
    <grid-component>
      <ul>
        ${links.map(
          (link: any) =>
            html`
              <li><a href=${link.href}>${link.label}</a></li>
            `
        )}
      </ul>
    </grid-component>
  `;
};
