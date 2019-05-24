import { LitElement, css, customElement, html } from "lit-element";

const Template = function() {
  return html`
    <grid-component> </grid-component>
  `;
};

const Style = css``;

@customElement("view-poll")
export class Component extends LitElement {
  public static styles = Style;
  public template = Template;
  public render = this.template.bind(this);
}
