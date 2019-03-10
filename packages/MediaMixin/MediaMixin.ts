import { html, property } from "lit-element";

type Constructor<T = {}> = new (...args: any[]) => T;

export function MediaMixin<B extends Constructor<HTMLElement>>(baseClass: B) {
  class MixinClass extends baseClass {
    @property({ type: String, reflect: true, attribute: "media-size" }) public mediaSize: string;

    constructor(...args: any[]) {
      super(...args);
      const observer = window.matchMedia("(max-width: 500px)");
      const myListener = (media: any) => {
        let mediaSize;
        if (media.matches) {
          mediaSize = "mobile";
        } else {
          mediaSize = "desktop";
        }
        this.mediaSize = mediaSize;
        window.dispatchEvent(
          new CustomEvent("media-changed", {
            composed: true,
            detail: mediaSize
          })
        );
      };
      observer.addListener(myListener);
      myListener(observer);
    }
  }

  return MixinClass;
}
