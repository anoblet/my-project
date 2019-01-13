import { html } from "lit-element";
import { render } from "lit-html";

export default function({ user }: any) {
  return html`
    <ul>
      ${
        user.signedIn
          ? html`
              <a href="/user-settings"><li>Settings</li></a>
              <li><a href="/theme">Theme</a></li>
            `
          : ""
      }
      ${
        user.signedIn
          ? html`
              <a href="/user/signout"><li>Sign out</li></a>
            `
          : html`
              <a href="/user/signin">Sign in</a>
            `
      }
    </ul>
  `;
}
