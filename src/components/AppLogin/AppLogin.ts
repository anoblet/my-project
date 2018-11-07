import { LitElement } from '@polymer/lit-element';
import { Mixin } from '@anoblet/mixin';
import { BaseMixin } from '@anoblet/base-mixin'

import Template from './AppLoginTemplate';

import(/* webpackChunkName: "MyFirebaseLogin" */ '@anoblet/my-firebase/MyFirebaseLogin')
export class AppLogin extends Mixin(LitElement, [BaseMixin]) {
  render() {
    return Template.bind(this)();
  }
}

window.customElements.define('app-login', AppLogin);
