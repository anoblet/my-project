import { LitElement, property } from "lit-element";

type Constructor<T = {}> = new (...args: any[]) => T;

export function BeforeRender<BaseType extends Constructor<LitElement>>(
  BaseClass: BaseType
) {
  class MixinClass extends BaseClass {
    @property({ type: Boolean })
    public beforeRenderComplete: boolean = false;

    public connectedCallback() {
      super.connectedCallback();
      if (!this.beforeRenderComplete)
        this.beforeRender().then(() => (this.beforeRenderComplete = true));
    }

    public async beforeRender() {
      return;
    }

    public shouldUpdate(changedProperties: any) {
      return this.beforeRenderComplete && super.shouldUpdate(changedProperties);
    }
  }

  return MixinClass;
}

export default BeforeRender;
