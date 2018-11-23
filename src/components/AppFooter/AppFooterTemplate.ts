import '@material/mwc-fab';
import { html } from '@polymer/lit-element';
import * as style from './AppFooter.scss';

export default function ({ }: any) {
  return html`
    <style>
      ${style}
    </style>
    <a href="/">
      <mwc-fab icon="home"></mwc-fab>
    </a>
  `
}