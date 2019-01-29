import { html } from "lit-element";
import { render } from "lit-html";
import { editTheme } from "./EditTheme";
import { setTheme } from "./SetTheme";
import { theme } from "../ThemeComponent/Theme";

export default function({ app, user }: any) {
  const _theme: theme = {
    backgroundColor: "#3E3E4B",
    borderColor: "#255451",
    primaryColor: "#C7318E",
    secondaryColor: "#E75384",
    textColor: "#D5F0EE",
    linkColor: "#0A8470"
  };
  return html`
    <grid-component gap="1em">
      <card-component title="Edit theme">
        <div slot="content">
          ${setTheme()} ${editTheme(_theme)}
        </div>
      </card-component>
      <card-component title="Links">
        <div slot="content">
          <ul>
            <a href="/post"><li>Posts</li></a>
          </ul>
        </div>
      </card-component>
      <card-component title="App">
        <div slot="content">
          <label for="mode">Mode</label>
          <select
            id="mode"
            @input="${(e: any) => {
              const value = e.target.options[e.target.selectedIndex].value;
              this.setState({ mode: value }, "app");
            }}"
          >
            <option ?selected="${app.mode === "production"}" value="production"
              >Production</option
            >
            <option
              ?selected="${app.mode === "development"}"
              value="development"
              >Development</option
            >
            <option
              ?selected="${app.mode === "experimental"}"
              value="experimental"
              >Experimental</option
            >
          </select>
          <div>
            Theme:
          </div>
        </div>
      </card-component>
    </grid-component>
  `;
}
