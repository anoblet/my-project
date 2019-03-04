import { LitElement, customElement, property } from "lit-element";

import { store } from "../Store";
import { voice } from "../Voice";

@customElement("voice-component")
export class VoiceComponent extends LitElement {
  @property() public voice: boolean = false;

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
