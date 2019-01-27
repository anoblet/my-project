import { html, LitElement, property } from "lit-element";
import style from "./EyeExamStyle";
import template from "./EyeExamTemplate";
import { toast } from "../ToastComponent/Toast";
import { renderForm } from "../PropertyEditor/PropertyEditor";

import { WebSpeech } from "../WebSpeech/WebSpeech";

const WebSpeechInstance: any = new WebSpeech();

const checkDuplicate: any = (input: any, criteria: string) => {
  const result = input();
  if (result == criteria) return checkDuplicate(input, criteria);
  else return result;
};

export interface config {}

export interface exam {
  // Start off at largest font-setSize
  step: {
    fontSize: string;
    history: { expectation: string; answer: string; result: boolean };
  };
}

export class EyeExamComponent extends LitElement {
  @property() character: string;
  @property() currentIndex: number = -1;
  @property() fullscreen: boolean;
  @property({ type: Array }) history: any = [];
  @property({ type: String }) fontSize: string;
  @property() hideNavigation: boolean = false;
  @property() finished: boolean = false;
  @property() report: any = [];
  mode: number = 1;

  constructor() {
    super();
    WebSpeechInstance.onResult = (e: any) => this.onResult(e);
    WebSpeechInstance.onNoMatch = (e: any) => {
      console.log(e);
      toast("No match");
    };
    WebSpeechInstance.onError = (e: any) => {
      console.log(e);
      toast("Please try again");
      setTimeout(this.record, 250);
    };
    WebSpeechInstance.onEnd = (e: any) => {
      console.log("On end", this.currentIndex, this.history, e);
      if (this.history[this.currentIndex - 1])
        if (!this.history[this.currentIndex - 1].answer) {
          toast("Error");
        }
    };
  }

  onResult(e: any) {
    const currentIndex = e.results.length - 1;
    const answer = e.results[currentIndex][0].transcript;
    console.log(answer);
    console.log(this.currentIndex);
    console.log(this.history);
    console.log(this.history[this.currentIndex]);
    const lower = answer.toLowerCase();
    const result = lower.startsWith(this.history[this.currentIndex].expectation)
      ? true
      : false;
    this.history[this.currentIndex].answer = answer;
    this.history[this.currentIndex].result = result;
    this.history[this.currentIndex].fontSize = this.fontSize;
    this.performUpdate();
    if (this.currentIndex < 4) this.next();
    else {
      this.report.push(this.history);
      this.finished = true;
      toast("Finished");
    }
  }

  getCharacter() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    return letters.charAt(Math.floor(Math.random() * letters.length));
  }

  start() {

  }

  next() {
    if (this.currentIndex !== -1)
      if (!this.history[this.currentIndex].answer) {
        toast("Answer is needed");
        return;
      }
    if (this.currentIndex === this.history.length - 1) {
      let character;
      if (this.history[this.currentIndex])
        character = checkDuplicate(
          this.getCharacter,
          this.history[this.currentIndex].expectation
        );
      else character = this.getCharacter();
      this.character = character;
      const step = {
        expectation: character
      };
      this.history.push(step);
    } else {
      this.character = this.history[this.currentIndex + 1]["expectation"];
    }
    this.currentIndex++;
    setTimeout(this.record, 500);
  }

  previous() {
    if (!this.history.length) {
      toast("No history");
      return;
    }
    if (this.currentIndex < 1) {
      toast("Beyondd range");
      return;
    }
    this.character = this.history[this.currentIndex - 1]["expectation"];
    this.currentIndex--;
  }

  record() {
    WebSpeechInstance.recognition.start();
  }

  /**
   * Sets the font size
   * @param  size
   * @return void
   */

  setSize(size: string) {
    const character = <HTMLElement>this.renderRoot.querySelector("#character");
    character.style.fontSize = size;
  }

  static get properties() {
    return {
      autoStart: {
        type: Boolean,
        label: "Auto start"
      },

      fontSize: {
        label: "Font size",
        type: String
      },
      hideNavigation: {
        label: "Hide navigation",
        type: Boolean
      },
      hideRecord: {
        label: "Hide record",
        type: Boolean
      }
    };
  }

  firstUpdated() {
    this.fontSize = "2in";
    console.log(EyeExamComponent.properties);
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
