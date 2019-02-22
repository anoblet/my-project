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
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const grammar =
  "#JSGF V1.0; grammar letters; public <letter> = " +
  letters.join(". | ") +
  " ;";

export class WebSpeech {
  public recognition: any;
  public recognitionList: any;
  public result: string;

  constructor() {
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
      this.onError(event);
    };
    this.recognition.onnomatch = (event: any) => {
      this.onNoMatch(event);
    };
    this.recognition.onend = (event: any) => {
      this.onEnd(event);
    };
  }

  public onResult(event: any) {
    const currentIndex = event.results.length - 1;
    this.result = event.results[currentIndex][0].transcript;
  }

  public onEnd(event: any) {}

  public onError(event: any) {}

  public onNoMatch(event: any) {}
}
