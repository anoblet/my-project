import { html } from "lit-element";
import { store } from "../../Store";
import { filterByMode } from "../../Debug";
// Evaluated on first render, but not after
import { isSignedIn } from "../../User"

// Cannot use functions for conditionals as they are not observed

export default () => {
  return html`
    <ul>
      ${isSignedIn()
        ? html`
            <li><a href="/user-settings">Settings</a></li>
            <li><a href="/user-theme">Theme</a></li>
          `
        : ""}
      ${!isSignedIn()
        ? html`
            <li><a href="/user/signin">Sign in</a></li>
          `
        : html`
            <li><a href="/user/signout">Sign out</a></li>
          `}
    </ul>
  `;
}
