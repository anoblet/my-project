import { LitElement, customElement, property } from "lit-element";

import { ResizeObserver } from "resize-observer";
import Style from "./Style";
import Template from "./Template";

@customElement("ratio-component")
export class RatioComponent extends LitElement {
  public static styles = Style;
  public template = Template;
  public render = this.template.bind(this);

  @property() public size: string = "3:2";

  public connectedCallback() {
    super.connectedCallback();
    this.observeResize();
  }

  public observeResize() {
    const resizeObserver = new ResizeObserver((entries: any) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = width * 0.5;
        this.style.setProperty("height", height + "px");
      }
    });
    resizeObserver.observe(this);
  }
}
