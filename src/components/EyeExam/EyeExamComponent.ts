import { html, LitElement, property } from "lit-element";
import style from "./EyeExamStyle";
import template from "./EyeExamTemplate";
import { toast } from "../Toast/Toast";
import globalStyle from "../../GlobalStyle";
import { debug } from "../../Debug";

import { WebSpeech } from "../WebSpeech/WebSpeech";

const WebSpeechInstance: any = new WebSpeech();

const checkDuplicate: any = (input: any, criteria: string) => {
  const result = input();
  if (result === criteria) return checkDuplicate(input, criteria);
  else return result;
};

export interface Exam {
  lines: Line[];
}

export interface Line {
  size: string;
  results: Result[];
}

export interface Result {
  question: string;
  answer: string;
}

const validateResult = (e: any, expectation: string) => {
  const currentIndex = e.results.length - 1;
  const result = e.results[currentIndex][0].transcript;
  const lower = result.toLowerCase();
  return lower.startsWith(expectation);
};

const steps = [10, 8, 6.25, 5, 4, 3.125, 2.5, 2, 1];

export class EyeExamComponent extends LitElement {
  @property() public correctPerLine: number = 3;
  @property() public character: string;
  @property() public currentIndex: number = -1;
  @property() public distanceFromScreen: number = 20; // Arbitrary at this point
  @property() public finished: boolean = false;
  @property() public fullscreen: boolean;
  @property() public showHistory: boolean = true;
  @property() public showNavigation: boolean = true;
  @property() public showRecord: boolean = true;
  @property() public perLine: number = 5;
  @property() public perLineThreshold: number = 0.5;
  @property({ type: Array }) public report: any = [];
  @property() public startFontSize: any = "10em";
  @property({ type: Array }) public history: any = [];
  @property({ type: String }) public fontSize: string;

  constructor() {
    super();
    this.mapWebSpeechEvents();
  }

  public mapWebSpeechEvents() {
    WebSpeechInstance.onResult = (e: any) => this.onResult(e);
    WebSpeechInstance.onNoMatch = (e: any) => this.onNoMatch(e);
    WebSpeechInstance.onError = (e: any) => this.onError(e);
    WebSpeechInstance.onEnd = (e: any) => this.onEnd(e);
  }

  public onEnd(e: any) {
    debug("On end");
    if (this.history[this.currentIndex - 1])
      if (!this.history[this.currentIndex - 1].answer) {
        toast("Error");
      }
  }

  public onError(e: any) {
    console.log(e);
    toast("Please try again");
    setTimeout(this.record, 250);
  }

  public onNoMatch(e: any) {
    console.log(e);
    toast("No match");
  }

  public onResult(e: any) {
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

  public getResult(e: any) {
    const currentIndex = e.results.length - 1;
    return e.results[currentIndex][0].transcript;
  }

  public getCharacter() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    return letters.charAt(Math.floor(Math.random() * letters.length));
  }

  public start() {}

  public next() {
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
      this.character = this.history[this.currentIndex + 1].expectation;
    }
    this.currentIndex++;
    setTimeout(this.record, 500);
  }

  public previous() {
    if (!this.history.length) {
      toast("No history");
      return;
    }
    if (this.currentIndex < 1) {
      toast("Beyondd range");
      return;
    }
    this.character = this.history[this.currentIndex - 1].expectation;
    this.currentIndex--;
  }

  public record() {
    WebSpeechInstance.recognition.start();
  }

  /**
   * Sets the font size
   * @param  size
   * @return void
   * */

  public setSize(size: string) {
    const character = this.renderRoot.querySelector(
      "#character"
    ) as HTMLElement;
    character.style.fontSize = size;
  }

  // Lifecycle methods

  public firstUpdated() {
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
    return [globalStyle, style];
  }

  get template() {
    return template.bind(this)();
  }

  public render() {
    return this.template;
  }
}
window.customElements.define("eye-exam", EyeExamComponent);
