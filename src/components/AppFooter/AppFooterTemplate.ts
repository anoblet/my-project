import '@material/mwc-fab';
import { html } from '@polymer/lit-element';
import * as style from './AppFooter.scss';

export default function ({ }: any) {
  return html`
    <style>
      ${style}
    </style>
      <mwc-fab label="placeholder" mini></mwc-fab>
      <a href="/">
        <mwc-fab label="Home" icon="home"></mwc-fab>
      </a>
      <mwc-fab label="placeholder" mini></mwc-fab>
  `
}