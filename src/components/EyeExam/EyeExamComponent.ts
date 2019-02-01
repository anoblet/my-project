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
  lines: Array<line>;
}

export interface line {
  size: string;
  results: Array<result>;
}

export interface result {
  question: string;
  answer: string;
}

const log = [];

const debug = (message: string) => {
  log.push(message);
};

// [ Properties] is now going to be an object, lets roll with that
const properties = {};

const validateResult = (e: any, expectation: string) => {
  const currentIndex = e.results.length - 1;
  const result = e.results[currentIndex][0].transcript;
  const lower = result.toLowerCase();
  return lower.startsWith(expectation);
};

const steps = [10, 8, 6.25, 5, 4, 3.125, 2.5, 2, 1];

export class EyeExamComponent extends LitElement {
  @property() correctPerLine: number = 3;
  @property() character: string;
  @property() currentIndex: number = -1;
  @property() distanceFromScreen: number = 20; // Arbitrary at this point
  @property() finished: boolean = false;
  @property() fullscreen: boolean;
  @property() showHistory: boolean = false;
  @property() showNavigation: boolean = false;
  @property() showRecord: boolean = false;
  @property() perLine: number = 5;
  @property() perLineThreshold: number = 0.5;
  @property({ type: Array }) report: any = [];
  @property() startFontSize: any = "10em";
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

    const result = validateResult(
      e,
      this.history[this.currentIndex].expectation
    );

    const index = this.history.length - 1;
    this.history[index].answer = answer;
    this.history[index].result = result;

    console.log(this.history.length - 1);
    if (this.currentIndex < this.perLine - 1) this.next();
    else {
      this.report.push({ fontSize: this.fontSize, history: this.history });
      this.history = [];
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
   * */

  setSize(size: string) {
    const character = <HTMLElement>this.renderRoot.querySelector("#character");
    character.style.fontSize = size;
  }

  // Lifecycle methods

  firstUpdated() {
    this.fontSize = "152pt";
  }

  // Component methods
  static get properties() {
    return {
      autoStart: {
        type: Boolean,
        label: "Auto start"
      },
      distanceFromScreen: {
        description: "Distance from screen as measured in meters",
        type: Number,
        label: "Distance from screen(meters)"
      },
      startFontSize: {
        label: "Font size",
        type: String
      },
      showHistory: {
        label: "Show history",
        type: Boolean
      },
      showNavigation: {
        label: "Show navigation",
        type: Boolean
      },
      showRecord: {
        label: "Show record",
        type: Boolean
      },
      perLine: {
        label: "Characters per line",
        type: Number
      },
      perLineThreshold: {
        description:
          "A value in between 0 and 1 indication correct answers/questions asked.",
        label: "Per line threshold",
        type: Number
      }
    };
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
