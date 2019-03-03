import { property } from "lit-element";

type Constructor<T = {}> = new (...args: any[]) => T;

export function BeforeRender<B extends Constructor<HTMLElement>>(baseClass: B) {
  class Mixin extends baseClass {
    @property({ type: String, reflect: true, attribute: "media-size" })
    public mediaSize: string;

    constructor(...args: any[]) {
      super(...args);
    }
  }

  return Mixin;
}
