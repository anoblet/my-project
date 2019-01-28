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
  lines: Array<line>
}

export interface line {
  size: string
  results: Array<result>
}

export interface result {
  question: string,
  answer: string
}

const log = [];

const debug = (message: string) => {
  log.push(message);
};

// [ Properties] is now going to be an object, lets roll with that
const properties = {
  
}

export class EyeExamComponent extends LitElement {
  @property() character: string;
  @property() currentIndex: number = -1;
  @property() finished: boolean = false;
  @property() fullscreen: boolean;
  @property() hideHistory: boolean = true;
  @property() hideNavigation: boolean = true;
  @property() hideRecord: boolean = true;
  @property() perLine: number = 5;
  @property() correctPerLine: number = 3;
  @property() report: any = [];
  @property({ type: Array }) history: any = [];
  @property({ type: String }) fontSize: string;

  constructor() {
    super();
    this.mapWebSpeechEvents();
  }

  mapWebSpeechEvents() {
    WebSpeechInstance.onResult = (e: any) => this.onResult(e);
    WebSpeechInstance.onNoMatch = (e: any) => this.onNoMatch(e);
    WebSpeechInstance.onError = (e: any) => this.onError(e);
    WebSpeechInstance.onEnd = (e: any) => this.onEnd(e);
  }

  onEnd(e: any) {
    debug("On end");
    if (this.history[this.currentIndex - 1])
      if (!this.history[this.currentIndex - 1].answer) {
        toast("Error");
      }
  }

  onError(e: any) {
    console.log(e);
    toast("Please try again");
    setTimeout(this.record, 250);
  }

  onNoMatch(e: any) {
    console.log(e);
    toast("No match");
  }

  onResult(e: any) {
    const answer = this.getResult(e);
    const lower = answer.toLowerCase();
    const result = lower.startsWith(this.history[this.currentIndex].expectation)
      ? true
      : false;
    this.history[this.currentIndex].answer = answer;
    this.history[this.currentIndex].result = result;
    // this.history[this.currentIndex].fontSize = this.fontSize;
    this.performUpdate();
    if (this.currentIndex < this.perLine - 1) this.next();
    else {
      this.report.push(this.history);
      this.finished = true;
      toast("Finished");
    }
  }

  getResult(e: any) {
    const currentIndex = e.results.length - 1;
    return e.results[currentIndex][0].transcript;
  }

  getCharacter() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    return letters.charAt(Math.floor(Math.random() * letters.length));
  }

  start() {}

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
      hideHistory: {
        label: "Hide history",
        type: Boolean
      },
      hideNavigation: {
        label: "Hide navigation",
        type: Boolean
      },
      hideRecord: {
        label: "Hide record",
        type: Boolean
      },
      perLine: {
        label: "Characters per line",
        type: Number
      }
    };
  }

  firstUpdated() {
    this.fontSize = "2in";
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
