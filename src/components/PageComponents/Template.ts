import { html } from "lit-element";

export default function() {
  return html`
    <grid-component id="content-grid">
      <card-component title="Components">
        <div slot="content">
          <grid-component columns="2">
            ${this.components.map(
              (component: any) => html`
                <card-component>
                  <div class="center">
                    <a href="/components/${component.tag}"
                      >${component.label}</a
                    >
                  </div>
                </card-component>
              `
            )}
          </grid-component>
        </div></card-component
      >
    </grid-component>
  `;
}
