import { LitElement, customElement, html, property } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { mdToHtml } from "../../../packages/Showdown/Showdown";

@customElement("readme-component")
class Readme extends LitElement {
  @property() public path: string =
    "https://raw.githubusercontent.com/anoblet/my-project/master/README.md";
  @property() public html: string;

  public async beforeRender() {
    const data = await fetch(this.path).then((response: any) =>
      response.text()
    );
    this.html = mdToHtml(data);
  }

  public render() {
    return html`
      ${unsafeHTML(this.html)}
    `;
  }
}
