import { customElement, html, LitElement, property } from "lit-element";
import style from "./EyeChartStyle";
import template from "./EyeChartTemplate";

// @customElement("blog-component")
export class EyeChart extends LitElement {
  @property() lines: number = 10;

  getChart() {
    const lines = new Array(this.lines).fill(0);
    return html`
      ${
        lines.map(
          (line: any, index) =>
            html`
              <div>${this.getLine(index)}</div>
            `
        )
      }
    `;
  }

  getLine(index: number) {
    const characters = new Array(index).fill(0);
    return html`
      ${
        characters.map(
          (character: any, index) =>
            html`
              ${this.getCharacter()}
            `
        )
      }
    `;
  }

  getCharacter() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    return letters.charAt(Math.floor(Math.random() * letters.length));
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

window.customElements.define("eye-chart", EyeChart);
