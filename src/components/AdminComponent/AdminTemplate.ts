import { html } from "lit-element";
import { setTheme } from "./SetTheme";
import { store } from "../../Store";

export default function() {
  const state = store.getState();
  const app = state.app;
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
          </grid-component>
        </div>
      </card-component>
      <card-component title="Links">
        <div slot="content">
          <ul>
            <a href="/post/list"><li>Posts</li></a>
          </ul>
        </div>
      </card-component>
    </grid-component>
  `;
}
