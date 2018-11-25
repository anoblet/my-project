import '@material/mwc-fab';
import { html } from '@polymer/lit-element';
import * as style from './AppFooter.scss';

export default function ({ }: any) {
  return html`
    <style>
      ${style}
    </style>
    <a href="https://github.com/anoblet/my-app" target="_blank">
        <mwc-fab id="github" icon="code" label="placeholder" mini></mwc-fab>
    </a>
    <a href="/">
      <mwc-fab icon="home" label="Home" mini></mwc-fab>
    </a>
    <a href="mailto: andrewbnoblet@gmail.com">
      <mwc-fab icon="mail_outline" label="placeholder" mini></mwc-fab>
    </a>

  `
}