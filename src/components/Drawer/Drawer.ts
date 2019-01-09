import { html, LitElement, property } from "@polymer/lit-element";
import { connect } from "pwa-helpers/connect-mixin.js";
import { Mixin } from "../../../packages/Mixin";
import { store } from "../../store.js";
import * as style from "./Drawer.scss";
import Template from "./DrawerTemplate";

/**
 * @todo Extend BaseElement
 */

export class Drawer extends Mixin(connect(store)(LitElement), []) {}

window.customElements.define("app-drawer", Drawer);
