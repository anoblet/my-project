import { LitElement, html } from "lit-element";

type Constructor<T = {}> = new (...args: any[]) => T;

export function Template<BaseType extends Constructor<LitElement>>(
  BaseClass: BaseType
) {
  class MixinClass extends BaseClass {
    template = html``;
    render() {
      return this.template;
    }
  }

  return MixinClass;
}
