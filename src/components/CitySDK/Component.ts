import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

@customElement("city-sdk")
export class CitySDK extends LitElement {
  @property() public vintage: string;
  @property() public geoHierarchy: {};
  @property() public sourcePath: [];
  @property() public values: [];
  @property() public geoResolution: string;
  @property() public predicates: {};
  @property() public statsKey: string;

  public static styles = [GlobalStyle, Style];
  public render = Template.bind(this)();
}
