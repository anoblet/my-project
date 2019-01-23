import { html } from "lit-element";
import { store } from "../../Store";

export default function({ user }: any) {
  return html`
    <ul>
      ${
        user.signedIn
          ? html`
              <a href="/user-settings"><li>Settings</li></a>
            `
          : ""
      }
      ${
        user.signedIn
          ? store.getState().app.settings.mode >= 1
            ? html`
                <li><a href="/user-theme">Theme</a></li>
              `
            : ""
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
