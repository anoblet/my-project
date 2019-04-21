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

  public timeleft = 1200;

  public getMinutes() {
    return Math.floor(this.timeleft / 60);
  }

  public getSeconds() {
    const minutes = this.getMinutes();
    return this.timeleft - minutes * 60;
  }

  public start() {
    setInterval(() => this.timeleft--, 1000);
  }
}
