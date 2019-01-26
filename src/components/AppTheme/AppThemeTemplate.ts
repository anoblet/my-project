// @deprecated
alert("hi");

import { html } from "lit-element";
export default function({ theme, user }: any) {
  return html`
    ${user.signedIn
      ? html`
          <my-flex direction="column" grow>
            <my-grid>
              <card-component grow>
                <h3 slot="title">Current theme</h3>
                <my-flex slot="content">
                  <my-grid columns="2">
                    <label>Background color</label>
                    <input
                      @input="${(e: any) =>
                        this.setState(
                          { backgroundColor: e.target.value },
                          "theme"
                        )}"
                      aria-label="Background color"
                      type="color"
                      value="${theme.backgroundColor}"
                    />
                    <label>Text color</label>
                    <input
                      @input="${(e: any) =>
                        this.setState({ textColor: e.target.value }, "theme")}"
                      aria-label="Text color"
                      type="color"
                      value="${theme.textColor}"
                    />
                    <label>Border color</label>
                    <input
                      @input="${(e: any) =>
                        this.setState(
                          { borderColor: e.target.value },
                          "theme"
                        )}"
                      aria-label="Border color"
                      type="color"
                      value="${theme.borderColor}"
                    />
                    <label>Primary color</label>
                    <input
                      @input="${(e: any) =>
                        this.setState(
                          { primaryColor: e.target.value },
                          "theme"
                        )}"
                      aria-label="Primary color"
                      type="color"
                      value="${theme.primaryColor}"
                    />
                    <label>Secondary color</label>
                    <input
                      @input="${(e: any) =>
                        this.setState(
                          { secondaryColor: e.target.value },
                          "theme"
                        )}"
                      aria-label="Secondary color"
                      type="color"
                      value="${theme.secondaryColor}"
                    />
                    <grid-item center span="2">
                      <input
                        id="themeName"
                        placeholder="Theme name"
                        type="text"
                      />
                    </grid-item>
                    <grid-item center span="2">
                      <mwc-button outlined @click="${() => this.saveTheme()}"
                        >Save theme</mwc-button
                      >
                    </grid-item>
                  </my-grid>
                </my-flex>
              </card-component>
              <card-component grow>
                <h3 slot="title">Options</h3>
                <my-flex slot="content">
                  <my-grid columns="2">
                    <mwc-checkbox
                      @click="${(e: Event) => {
                        console.log(e.target);
                        // this.setState({ border: e.target.checked }, theme);
                      }}"
                    ></mwc-checkbox>
                  </my-grid>
                  <div>
                    <input
                      type="checkbox"
                      ?checked="${theme.randomOnLoad}"
                      @input="${this.randomOnLoadToggle}"
                    />
                    Random color on refresh
                  </div>
                </my-flex>
              </card-component>
              <card-component grow>
                <h3 slot="title">Defaut themes</h3>
                <my-flex slot="content">
                  <my-grid columns="2" style="grid-">
                    <mwc-button
                      outlined
                      @click="${() => this.setTheme("light")}"
                      >Light</mwc-button
                    >
                    <mwc-button outlined @click="${() => this.setTheme("dark")}"
                      >Dark</mwc-button
                    >
                    <mwc-button outlined @click="${() => this.setTheme("misc")}"
                      >Gray</mwc-button
                    >
                    <mwc-button
                      outlined
                      @click="${() => this.randomizeColors()}"
                      >Random</mwc-button
                    >
                  </my-grid>
                </my-flex>
              </card-component>
              <card-component grow>
                <h3 slot="title">Saved themes</h3>
                <my-flex slot="content">
                  <my-grid columns="2"> ${this.listThemes()} </my-grid>
                </my-flex>
              </card-component>
            </my-grid>
          </my-flex>
        `
      : html`
          Sign in to change your theme
        `}
  `;
}
