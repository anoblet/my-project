import { html } from "lit-element";
import "@anoblet/external-link";

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
  // {
  //   href: "/about",
  //   label: "About"
  // },
  {
    href: "/issue",
    label: "Report an issue"
  }
];

export default function() {
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
                    <external-link href=${href} label=${label}></external-link>
                  `}
            </li>
          `
      )}
    </ul>
  `;
}
