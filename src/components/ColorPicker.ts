import { LitElement, customElement, html, property } from "lit-element";

import GlobalStyle from "../GlobalStyle";
import { setTheme } from "../Theme";
import { BeforeRender } from "../mixins/BeforeRender";

@customElement("color-picker")
export class ColorPicker extends BeforeRender(LitElement) {
  @property() public color: string;

  public static styles = GlobalStyle;

  public render() {
    return html`
      <input type="color" @input=${this.colorChanged} />
    `;
  }

  public colorChanged(e: any) {
    setTheme(
      [{ property: "--primary-color", value: e.target.value }],
      document.querySelector("app-component")
    );
  }
}
