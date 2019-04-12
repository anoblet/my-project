import { LitElement, customElement, property } from "lit-element";
import { store } from "../../Store";

import Style from "./Style";
import Template from "./Template";

@customElement("playground-component")
export class Playground extends LitElement {
  @property() public template: any = Template;

  public static styles = [Style];

  public render() {
    return this.template.bind(this)();
  }

  public getTheme() {
    const state = store.getState();
    return state.app.settings.theme;
  }
}
