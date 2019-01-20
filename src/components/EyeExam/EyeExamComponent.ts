import { html, LitElement, property } from "lit-element";
import style from "./EyeExamStyle";
import template from "./EyeExamTemplate";

import { WebSpeech } from "../WebSpeech/WebSpeech";

const WebSpeechInstance = new WebSpeech();

export class EyeExamComponent extends LitElement {
  @property() character: string;
  @property() currentIndex: number = -1;
  // fullscreen
  @property() fullscreen: boolean;
  mode: number = 1;
  @property({ type: Array }) history: any = [];

  constructor() {
    super();
    WebSpeechInstance.onResult = (e: any) => {
      const currentIndex = e.results.length - 1;
      const result = e.results[currentIndex][0].transcript;
      this.history[this.currentIndex].result = result;
      this.requestUpdate();
    };
  }

  firstUpdated() {
    this.next();
  }

  getCharacter() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    return letters.charAt(Math.floor(Math.random() * letters.length));
  }

  handsOff() {
    // Turn on fullscreen
    this.fullscreen = true;
    // Assume white on color
  }

  next() {
    if (this.currentIndex === this.history.length - 1) {
      this.character = this.getCharacter();
      const step = {
        expectation: this.character,
        result: ""
      };
      this.history.push(step);
    } else {
      this.character = this.history[this.currentIndex + 1]["expectation"];
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
    this.character = this.history[this.currentIndex - 1]["expectation"];
    this.currentIndex--;
  }

  record() {
    WebSpeechInstance.recognition.start();
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
window.customElements.define("eye-exam", EyeExamComponent);
