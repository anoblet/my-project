import { html } from "lit-element";
import { store } from "../../Store";
import { filterByMode } from "../../Debug";
// Evaluated on first render, but not after
import { isSignedIn, signOut } from "../../User";

// Cannot use functions for conditionals as they are not observed
// Rather than use a hyperlink, why not fire an event

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
            <li><a href="" @click=${signOut}>Sign out</a></li>
          `}
    </ul>
  `;
};
