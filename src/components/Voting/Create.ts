import { LitElement, css, customElement, html } from "lit-element";

const Template = function() {
  return html`
    <grid-component> </grid-component>
  `;
};

const Style = css``;

@customElement("poll-create")
export class Component extends LitElement {
  public static styles = Style;
  public render = Template.bind(this);
}
