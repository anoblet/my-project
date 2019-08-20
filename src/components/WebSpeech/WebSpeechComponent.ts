import { LitElement, css, html, property } from "lit-element";

import { letters } from "@anoblet/letter-array";
import template from "./WebSpeechTemplate";

declare global {
  interface Window {
    SpeechRecognition: any;
    SpeechGrammarList: any;
    SpeechRecognitionEvent: any;
    webkitSpeechRecognition: any;
    webkitSpeechGrammarList: any;
    webkitSpeechRecognitionEvent: any;
  }
}

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const grammar =
  "#JSGF V1.0; grammar letters; public <letter> = " +
  letters.join(". | ") +
  " ;";

export class WebSpeech extends LitElement {
  public recognition: any;
  public recognitionList: any;
  @property() public result: string;

  public connectedCallback() {
    super.connectedCallback();
    if (!SpeechRecognition) alert("No speech recognition");
    if (!SpeechGrammarList) alert("No speech grammer list");
    if (!SpeechRecognitionEvent) alert("No speech recognition event");
    this.recognition = new SpeechRecognition();
    this.recognitionList = new SpeechGrammarList();
    this.recognitionList.addFromString(grammar, 1);
    this.recognition.grammars = this.recognitionList;
    this.recognition.lang = "en-US";
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;
    this.recognition.onresult = (event: any) => {
      this.onResult(event);
    };
    this.recognition.onerror = (event: any) => {
      console.log(event);
      console.log("Error");
    };
    this.recognition.onnomatch = (event: any) => {
      console.log(event);
      console.log("No match");
    };
  }

  public onResult(event: any) {
    const currentIndex = event.results.length - 1;
    this.result = event.results[currentIndex][0].transcript;
  }

  static get styles() {
    return [
      css`
        :host: {
        }
      `
    ];
  }

  public render() {
    return html`
      ${template.bind(this)()}
    `;
  }
}

window.customElements.define("web-speech", WebSpeech);
