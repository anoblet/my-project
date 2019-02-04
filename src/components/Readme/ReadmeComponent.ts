import { LitElement, customElement, property } from "lit-element";
import { getReadme } from "./Readme";

@customElement("readme-component")
class Readme extends LitElement {
  @property() template: any;

  render() {
    return getReadme();
  }
}
