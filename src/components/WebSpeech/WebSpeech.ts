import { css, html, LitElement, property } from "lit-element";
import template from "./WebSpeechTemplate";

import { letters } from "../../../packages/letters-array/letter-array";

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
var SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

var grammar =
  "#JSGF V1.0; grammar letters; public <letter> = " +
  letters.join(". | ") +
  " ;";

console.log(grammar);

export class WebSpeech extends LitElement {
  recognition: any;
  recognitionList: any;
  @property() text: string;

  connectedCallback() {
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

  onResult(event: any) {
    this.dispatchEvent(
      new CustomEvent("on-result", {
        composed: true,
        detail: event
      })
    );
    const currentIndex = event.results.length - 1;
    this.text = event.results[currentIndex][0].transcript;
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
