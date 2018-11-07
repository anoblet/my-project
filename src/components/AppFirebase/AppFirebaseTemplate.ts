import { html } from '@polymer/lit-element';
import '@anoblet/my-grid'
import '@anoblet/my-container'
import '@anoblet/my-flex'
import '@material/mwc-icon'

import * as style from './AppFirebase.scss'
import * as firebaseStyle from './firebase.scss'

export default function (props: any) {
  return html`
    <style>
      ${style}
      ${firebaseStyle}
    </style>
    <my-flex id="firebaseui-auth-container" direction="column">

    </my-flex>
  `
}