import { html } from "lit-element";
import { render } from "lit-html";

export default function({ user }: any) {
  return html`
    <ul>
      <li>
        ${
          user.signedIn
            ? html`
                <li><a href="/user-settings">Settings</a></li>
                <li><a href="/theme">Theme</a></li>
              `
            : ""
        }
        ${
          user.signedIn
            ? html`
                <a href="/user/signout">Sign out</a>
              `
            : html`
                <a href="/user/signin">Sign in</a>
              `
        }
      </li>
    </ul>
  `;
}
