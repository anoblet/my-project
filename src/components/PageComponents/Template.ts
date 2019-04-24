import { html } from "lit-element";

export default function() {
  return html`
    <grid-component id="content-grid">
      <card-component title="Components">
        <div slot="content">
          <grid-component columns="2">
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
        </div></card-component
      >
    </grid-component>
  `;
}
