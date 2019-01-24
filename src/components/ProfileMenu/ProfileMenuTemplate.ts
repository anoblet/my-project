import { html } from "lit-element";
import { store } from "../../Store";

import { filterByMode } from "../../Debug";

export default function({ user }: any) {
  return html`
    <ul>
      ${user.signedIn
        ? html`
            <li><a href="/user-settings">Settings</a></li>
          `
        : ""}
      ${filterByMode(1)
        ? html`
            <li><a href="/user-theme">Theme</a></li>
          `
        : ""}
      ${!user.signedIn
        ? html`
            <li><a href="/user/signin">Sign in</a></li>
          `
        : html`
            <li><a href="/user/signout">Sign out</a></li>
          `}
    </ul>
  `;
}
