import GlobalStyle from "../../GlobalStyle";
import { LitElement, customElement } from "lit-element";
import Style from "./Style";
import { store } from "../../Store";
import template from "./AppHeaderTemplate";

@customElement("app-header")
export class AppHeader extends LitElement {
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

  static get styles() {
    return [GlobalStyle, Style];
  }

  public render() {
    return template.bind(this)();
  }
}
