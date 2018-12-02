import { html } from '@polymer/lit-element';
export default function ({ theme, user }: any) {
  return html`
    ${ user.signedIn ? html`
      <my-flex direction="column" grow>
        <my-grid style="grid-template-columns: 1fr 1fr;">
          <label>Background color</label>
          <input @input="${(e: any) => this.setState({backgroundColor: e.target.value}, 'theme')}" aria-label="Background color" type="color" value="${theme.backgroundColor}" />
          <label>Text color</label>
          <input @input="${(e: any) => this.setState({textColor: e.target.value}, 'theme')}" aria-label="Text color" type="color" value="${theme.textColor}" />
          <label>Primary color</label>
          <input @input="${(e: any) => this.primaryColorChanged(e)}" aria-label="Primary color" type="color" value="${theme.primaryColor}" />
          <label>Secondary color</label>
          <input @input="${(e: any) => this.secondaryColorChanged(e)}" aria-label="Secondary color" type="color" value="${theme.secondaryColor}" />
          <mwc-button outlined @click="${() => this.setDefaultTheme()}">Defaut</mwc-button>
          <mwc-button outlined @click="${() => this.setTheme("light")}">Light theme</mwc-button>
          <mwc-button outlined @click="${() => this.setTheme("dark")}">Dark theme</mwc-button>
          <mwc-button outlined @click="${() => this.randomizeColors()}">Random</mwc-button>
        </my-grid>
      </my-flex>
    ` : html`
      Sign in to change your theme
    `}
  `
}
