import { html } from "lit-element";

const links = [  {
    href: "/user/posts",
    label: "Posts"
  },
  {
    href: "/user/theme",
    label: "Theme"
  },
  {
    href: "/user/settings",
    label: "Settings"
  }
];

export default function() {
  return html`
    <ul>
      ${
        links.map(
          (link: any) =>
            html`
              <li><a href="${link.href}">${link.label}</a></li>
            `
        )
      }
    </ul>
  `;
}
