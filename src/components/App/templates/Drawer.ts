import { html } from "lit-element";

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
                    <a href=${href} rel="noreferrer" target="_blank"
                      >${label}</a
                    >
                  `}
            </li>
          `
      )}
    </ul>
  `;
}
