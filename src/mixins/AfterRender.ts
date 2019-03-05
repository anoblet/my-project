import { LitElement, property } from "lit-element";

type Constructor<T = {}> = new (...args: any[]) => T;

export function AfterRender<BaseType extends Constructor<LitElement>>(
  BaseClass: BaseType
) {
  class MixinClass extends BaseClass {
    @property({ type: Boolean })
    public afterRenderComplete: boolean;
    constructor(...args: any[]) {
      super(...args);
      this.afterRenderComplete = false;
    }

    public firstUpdated(changedProperties: any) {
      super.firstUpdated(changedProperties);
      this.afterRender().then(() => (this.afterRenderComplete = true));
    }

    public async afterRender() {
      return;
    }
  }

  return MixinClass;
}
