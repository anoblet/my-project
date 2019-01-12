import { html, property } from 'lit-element';

type Constructor<T = {}> = new (...args: any[]) => T;

export function MediaMixin<B extends Constructor<HTMLElement>>(baseClass: B) {
  class MixinClass extends baseClass {
    @property({ type: String }) public mediaSize: string;

    constructor(...args: any[]) {
      super(...args);
      const observer = window.matchMedia('(max-width: 500px)');
      const myListener = (media: any) => {
        if (media.matches) {
          this.mediaSize = 'small';
        } else {
          this.mediaSize = undefined;
        }
      };
      observer.addListener(myListener);
      myListener(observer);
    }
  }

  return MixinClass;
}
