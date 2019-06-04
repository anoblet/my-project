import { LitElement, customElement } from "lit-element";
import Style from "./Style";
import { store } from "../../Store";
import Template from "./Template";

@customElement("header-component")
export class HeaderComponent extends LitElement {
  public static styles = Style;
  public render() {
    return Template.bind(this)();
  }

  public firstUpdated() {
    const state = store.getState();
    const user = state.user;
    if (user.signedIn) this.setButtonBackground(user);
  }

  public setButtonBackground(user: any = false) {
    const button: any = this.querySelector("#userProfile");
    if (button)
      if (user.photo) {
        button.style.background = `url('${user.photo}')`;
        button.style.backgroundSize = "contain";
      }
  }
}
