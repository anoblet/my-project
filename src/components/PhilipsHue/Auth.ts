import { LitElement, html, property } from "lit-element";
import { BeforeRender } from "../../mixins/BeforeRender";

export class Auth extends BeforeRender(LitElement) {
  @property() id: any;
  @property() ip: any;
  @property() state: any;
  // 0 = No interraction,
  // 1 = Get username if available (proceed to step 4)
  // 1 = User pressed connect, and needs to press physical button,
  // 2 = User pressed physical button and we need username

  async beforeRender() {
    return;
  }

  render() {
    return html``;
  }
}
