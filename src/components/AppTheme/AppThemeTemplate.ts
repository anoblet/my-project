import { html } from '@polymer/lit-element';
export default function ({ theme, user }: any) {
  return html`
    ${ user.signedIn ? html`
      <my-flex direction="column" grow>
        <my-grid>
          <my-card grow>
            <h3 slot="title">Current theme</h3>
            <my-flex slot="content">
              <my-grid style="grid-template-columns: 1fr 1fr;">
                <label>Background color</label>
                <input @input="${(e: any) => this.setState({backgroundColor: e.target.value}, 'theme')}" aria-label="Background color" type="color" value="${theme.backgroundColor}" />
                <label>Text color</label>
                <input @input="${(e: any) => this.setState({textColor: e.target.value}, 'theme')}" aria-label="Text color" type="color" value="${theme.textColor}" />
                <label>Primary color</label>
                <input @input="${(e: any) => this.primaryColorChanged(e)}" aria-label="Primary color" type="color" value="${theme.primaryColor}" />
                <label>Secondary color</label>
                <input @input="${(e: any) => this.secondaryColorChanged(e)}" aria-label="Secondary color" type="color" value="${theme.secondaryColor}" />
                </my-grid>
            </my-flex>
          </my-card>
          <my-card grow>
            <h3 slot="title">Options</h3>
            <my-flex slot="content">
              <input type="checkbox" ?checked=${theme.randomOnLoad} @input=${this.randomOnLoadToggle} />
            </my-flex>
          </my-card>
          <my-card grow>
            <h3 slot="title">Saved themes</h3>
            <my-flex slot="content">
              <mwc-button outlined @click="${() => this.setDefaultTheme()}">Defaut</mwc-button>
              <mwc-button outlined @click="${() => this.setTheme("light")}">Light theme</mwc-button>
              <mwc-button outlined @click="${() => this.setTheme("dark")}">Dark theme</mwc-button>
              <mwc-button outlined @click="${() => this.randomizeColors()}">Random</mwc-button>
              <mwc-button outlined @click="${() => this.setState(this.miscTheme, 'theme')}">Misc theme</mwc-button>
            </my-flex>
          </my-card>
          <my-card grow>
            <h3 slot="title">Saved themes</h3>
            <my-flex slot="content">
              ${this.listThemes()}
              <input id="themeName" placeholder="Theme name" type="text" /><mwc-button outlined @click="${() => this.saveTheme()}">Save theme</mwc-button>
            </my-flex>
          </my-card>
        </my-grid>
      </my-flex>
    ` : html`
      Sign in to change your theme
    `}
  `
}
