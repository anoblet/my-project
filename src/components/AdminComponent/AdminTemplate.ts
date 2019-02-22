import { html } from "lit-element";
import { editTheme } from "./EditTheme";
import { setTheme } from "./SetTheme";
import { store } from "../../Store";
import { setState } from "../../../packages/state-helpers/state-helpers";

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
    </grid-component>
  `;
}
