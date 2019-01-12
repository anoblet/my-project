import { LitElement } from "lit-element";

import { Mixin } from "../../packages/Mixin";
import { FirebaseMixin } from "../../packages/FirebaseMixin";
import { StateMixin } from "../../packages/StateMixin";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../store.js";

export class SettingsListener extends Mixin(connect(store)(LitElement), [
  FirebaseMixin,
  StateMixin
]) {}
