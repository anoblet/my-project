import { html } from "lit-element";

export default function() {
  return html`
    <grid-component id="columns">
      ${this.components.map(
        (component: any) => html`
          <a href="/components/${component.tag}">
            <card-component>
              <div class="center">
                ${component.label}
              </div>
            </card-component></a
          >
        `
      )}
    </grid-component>
  `;
}
