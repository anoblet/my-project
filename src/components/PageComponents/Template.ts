import { html } from "lit-element";

export default function() {
  return html`
    <grid-component id="content-grid">
      <card-component title="Components">
        <div slot="content">
          <ul>
            ${this.components.map(
              (component: any) => html`
                <li>
                  <a href="/components/${component.tag}">${component.label}</a>
                </li>
              `
            )}
          </ul>
        </div></card-component
      >
    </grid-component>
  `;
}
