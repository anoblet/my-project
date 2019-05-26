import { LitElement, css, customElement, html } from "lit-element";

const Template = function() {
  return html`
    <grid-component>
      <label>Title: </label><input type="text">
    </grid-component>
  `;
};

const Style = css``;

@customElement("poll-create")
export class Component extends LitElement {
  public static styles = Style;
  public render = Template.bind(this);
}
