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

  _setDefaultValue() {
    // @ts-ignore
    const properties = this.constructor.properties;
    Object.keys(properties).map(key => {
      // @ts-ignore
      if (properties[key].value) this[key] = properties[key].value;
    });
  }
}
