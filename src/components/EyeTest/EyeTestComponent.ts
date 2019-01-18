import { customElement, LitElement, property } from "lit-element";
import style from "./EyeTestStyle";
import template from "./EyeTestTemplate";

// @customElement("blog-component")
export class EyeTest extends LitElement {
  @property() character: string;
  @property({ type: Array }) history: any = [];
  @property() currentIndex: number = -1;
  mode: number = 1;

  firstUpdated() {
    this.next();
  }

  getCharacter() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    return letters.charAt(Math.floor(Math.random() * letters.length));
  }

  next() {
    if (this.currentIndex === this.history.length - 1) {
      this.character = this.getCharacter();
      this.history.push(this.character);
    } else {
      this.character = this.history[this.currentIndex + 1];
    }
    this.currentIndex++;
  }

  previous() {
    if (!this.history.length) {
      console.log("No history");
      return;
    }
    if (this.currentIndex < 1) {
      console.log("Beyond range");
      return;
    }
    this.character = this.history[this.currentIndex - 1];
    this.currentIndex--;
  }

  static get styles() {
    return [style];
  }

  get template() {
    return template.bind(this)();
  }

  public render() {
    return this.template;
  }
}

window.customElements.define("eye-test", EyeTest);
