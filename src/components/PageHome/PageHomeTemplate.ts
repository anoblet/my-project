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
      <my-card collapsible style="grid-column: 1/-1">
        <div slot="title">Welcome</div>
        <div slot="content">
          Welcome ${user.name ? user.name : 'Guest'}! ${!user.signedIn ? html`Sign in to save settings` : html`You are currently signed in: Your settings will now be saved`}.
          <p>
            This scaffolding uses:
            <ul>
              <li>firebase</li>
              <li>lit-element</li>
              <li>lit-redux-router</li>
              <li>redux</li>
            </ul>
          </p>
        </div>
      </my-card>
      <my-card style="grid-column: 1/-1">
        <div slot="title">Lorem Ipsum</div>
        <div slot="content">
          <lorem-ipsum count="100"></lorem-ipsum>
        </div>
      </my-card>
    </my-grid>
  `
}
