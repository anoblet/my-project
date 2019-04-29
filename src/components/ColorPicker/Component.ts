import { LitElement, customElement } from "lit-element";
import Style from "./Style";
import Template from "./Template";

import Pickr from "@simonwep/pickr/dist/pickr.es5.min";

@customElement("color-picker")
export class Component extends LitElement {
  public static styles = Style;
  public template = Template;
  public render = this.template.bind(this);

  public firstUpdated() {
    const pickr = Pickr.create({
      el: ".color-picker",

      components: {
        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
          hex: true,
          rgba: true,
          hsla: true,
          hsva: true,
          cmyk: true,
          input: true,
          clear: true,
          save: true
        }
      }
    });
  }
}
