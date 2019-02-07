import { LitElement, property } from "lit-element";

export class BaseElement extends LitElement {
  @property() private loaded = false;
  public connectedCallback() {
    super.connectedCallback();
    this.beforeLoaded().then(() => {
      this.loaded = true;
    });
  }

  private async beforeLoaded() {
    return;
  }

  protected shouldUpdate(changedProperties: any) {
    if (this.loaded) return super.shouldUpdate(changedProperties);
    else {
      return false;
    }
  }

  private _setDefaultValue() {
    // @ts-ignore
    const properties = this.constructor.properties;
    Object.keys(properties).map((key: string) => {
      // @ts-ignore
      if (properties[key].value) this[key] = properties[key].value;
    });
  }
}
