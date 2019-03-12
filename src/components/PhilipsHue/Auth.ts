import { LitElement, html, property } from "lit-element";
import { BeforeRender } from "../../mixins/BeforeRender";
import { auth } from "./PhilipsHue";

export class Auth extends BeforeRender(LitElement) {
  @property() id: any;
  @property() ip: any;

  async beforeRender() {
    console.log(auth())
    return;
  }

  render() {
    return html``;
  }
}
