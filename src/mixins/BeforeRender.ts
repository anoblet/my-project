import { property } from "lit-element";

type Constructor<T = {}> = new (...args: any[]) => T;

export function BeforeRender<B extends Constructor<HTMLElement>>(baseClass: B) {
  class Mixin extends baseClass {
    @property({ type: Boolean })
    public beforeRenderComplete: boolean;

    constructor(...args: any[]) {
      super(...args);
      this.beforeRenderComplete = false;
      this.beforeRender().then(() => (this.beforeRenderComplete = true));
    }

    public async beforeRender() {
      return;
    }
  }

  return Mixin;
}
