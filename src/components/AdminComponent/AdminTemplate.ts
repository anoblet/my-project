import { html } from "lit-element";
import { editTheme } from "./EditTheme";
import { setTheme } from "./SetTheme";
import { theme } from "../ThemeComponent/Theme";
import { store } from "../../Store";

export default function() {
  const state = store.getState();
  const app = state.app;
  const _theme = {};
  return html`
    <grid-component gap="1em">
      <card-component collapsible collapsed title="Global Scope">
        <div slot="content">
          <grid-component>
            <card-component collapsible collapsed title="Assign theme">
              <div slot="content">
                ${setTheme()}
              </div>
            </card-component>
            <card-component collapsible collapsed title="Edit theme">
              <div slot="content">
                ${editTheme(_theme)}
              </div>
            </card-component>
          </grid-component>
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
