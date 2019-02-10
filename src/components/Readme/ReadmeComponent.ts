import { LitElement, customElement, property } from "lit-element";
import { getReadme } from "./Readme";

@customElement("readme-component")
class Readme extends LitElement {
  @property() public path: string = "https://raw.githubusercontent.com/anoblet/my-project/master/README.md";

  public render() {
    return getReadme(this.path);
  }
}
