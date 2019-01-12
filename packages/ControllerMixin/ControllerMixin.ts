import { html, property } from "lit-element";

type Constructor<T = {}> = new (...args: any[]) => T;

export function ControllerMixin<B extends Constructor<HTMLElement>>(
  baseClass: B
) {
  class MixinClass extends baseClass {}

  return MixinClass;
}
