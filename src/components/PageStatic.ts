import { LitElement, customElement, html, property } from "lit-element";


@customElement("page-static")
class PageStatic extends LitElement {
  @property() public template: any;

  public render() {
    return html`
      <card-component title="Welcome">
        Welcome! This is a static page. If you're looking for content go to <a href="/blog">/blog</a>. To view the timings of the app, go to <a href="/log">/log</a>.
      </card-component>
    `;
  }
}
