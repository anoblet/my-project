import { LitElement, customElement, property } from "lit-element";

import { ResizeObserver } from "resize-observer";
import Style from "./Style";
import Template from "./Template";

@customElement("ratio-component")
export class RatioComponent extends LitElement {
  public static styles = Style;
  public render = Template.bind(this);

  @property() public ratio: number = 1;
  @property() public width: number = 1;

  public connectedCallback() {
    super.connectedCallback();
    this.observeResize();
  }

  public updated(changedProperties) {
    if (changedProperties.has("ratio")) this.onResize(this.width);
  }

  public observeResize() {
    const resizeObserver = new ResizeObserver((entries: any) => {
      for (const entry of entries) {
        this.width = entry.contentRect.width;
        this.onResize(this.width);
      }
    });
    resizeObserver.observe(this);
  }

  public onResize(width: number) {
    const height = width * this.ratio;
    this.style.setProperty("height", height + "px");
  }
}
