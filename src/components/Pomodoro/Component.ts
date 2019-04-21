import { LitElement, customElement } from "lit-element";
import Style from "./Style";
import Template from "./Template";
import Properties from "./Properties";

@customElement("pomodoro-component")
export class Component extends LitElement {
  public static properties = Properties;
  public static styles = Style;
  public template = Template;
  public render = this.template.bind(this);

  protected timeleft = 1200;
  protected _interval: any;
  protected _currentStep: number = 0;
  protected _currentMode: string = "focus";

  public get _minutes() {
    return Math.floor(this.timeleft / 60);
  }

  public get _seconds() {
    return this.timeleft - this._minutes * 60;
  }

  public start() {
    this._interval = setInterval(() => this.timeleft--, 1000);
  }

  public stop() {
    clearInterval(this._interval);
    this._interval = false;
  }

  public reset() {
    this.stop();
    this.timeleft = 1200;
  }

  public selectStep(step: number) {
    this._currentStep = step;
  }

  public selectMode(mode: string) {
    this._currentMode = mode;
  }
}
