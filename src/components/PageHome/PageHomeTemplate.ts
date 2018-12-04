import '@material/mwc-fab';
import { html } from '@polymer/lit-element';
import * as style from './PageHome.scss';
import { until } from 'lit-html/directives/until';

export default function ({ user }: any) {
  return html`
    <style>
      ${style}
    </style>
    <my-grid id="content-grid" style="grid-template-columns: repeat(auto-fit, minmax(350px, 1fr) );">
      <my-card style="grid-column: 1/-1">
        <div slot="title">Welcome</div>
        Welcome ${user.name ? user.name : 'Guest'}! ${!user.signedIn ? html`Sign in to save settings` : html`You are currently signed in: Your settings will now be saved`}.
      </my-card>
      <my-card>
        <div slot="title">State</div>
          <pre style="overflow: hidden;">${JSON.stringify(this.state, null, 2)};</pre>
      </my-card>
      <my-card>
        <div slot="title">Firebase</div>
        ${user.signedIn ? html`
          ${until(
            this.getDocument('theme').then((document: any) => {
              return html`
                <pre>${JSON.stringify(document, null, 2)}</pre>
              `
            }),
            html`<my-loader></my-loader>`
          )}
        ` : html`Sign in to see a Firebase document`}
      </my-card>
      <my-card style="grid-column: 1/-1">
        <div slot="title">Lorem Ipsum</div>
        <lorem-ipsum count="100"></lorem-ipsum>
      </my-card>
    </my-grid>
  `
}
