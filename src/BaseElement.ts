import { LitElement, property } from "lit-element";

export class BaseElement extends LitElement {
  @property() loaded = false;
  connectedCallback() {
    super.connectedCallback();
    this.beforeLoaded().then(() => {
      this.loaded = true;
    });
  }

  async beforeLoaded() {}

  shouldUpdate(changedProperties: any) {
    if (this.loaded) return super.shouldUpdate(changedProperties);
    else {
      return false;
    }
  }
}
