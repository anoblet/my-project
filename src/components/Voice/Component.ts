import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

import { store } from "../../Store";
import { voice } from "../../Voice";

@customElement("voice-component")
export class Voice extends LitElement {
  @property() public voice: boolean = false;
  public static styles = [GlobalStyle, Style];
  public template = Template;

  public render() {
    return this.template.bind(this)();
  }

  constructor() {
    super();
    store.subscribe(() => {
      const state = store.getState();
      if (state.user.settings) {
        this.voice = state.user.settings.voice;
      }
    });
  }

  public updated(changedProperties: any) {
    if (changedProperties.has("voice"))
      this.voice ? voice.enable() : voice.disable();
    return super.updated(changedProperties);
  }
}
