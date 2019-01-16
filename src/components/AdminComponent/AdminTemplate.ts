import { html } from "lit-element";
import { render } from "lit-html";

export default function({ app, user }: any) {
  return html`
    <grid-component gap="1em">
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
            @input="${
              (e: any) => {
                const value = e.target.options[e.target.selectedIndex].value;
                this.setState({ mode: value }, "app");
              }
            }"
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
        </div>
      </card-component>
    </grid-component>
  `;
}
