import '@material/mwc-fab';
import { html } from '@polymer/lit-element';
import { until } from 'lit-html/directives/until';

export default function ({ user }: any) {
  return html`
    <my-grid id="content-grid">
      <my-card scroll>
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
    </my-grid>
  `
}
