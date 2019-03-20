import { html } from "lit-element";
import { renderForm } from "../PropertyEditor/PropertyEditor";

export default function() {
  return html`
    <card-component title="Create a Github issue">
      <div slot="content" style="padding: 0;">
        <grid-component>
          <card-component id="form">
            ${renderForm(
              this,
              null,
              (_property: string, value: any) =>
                (this._data = { ...this._data, ...{ [_property]: value } })
            )}
          </card-component>
          ${false
            ? html`
                <card-component title="Data">
                  <div slot="content">
                    ${JSON.stringify(this._data)}
                  </div>
                </card-component>
              `
            : ""}
        </grid-component>
      </div>
      <div slot="actions">
        <mwc-button @click=${() => this.saveForm()}>Create</mwc-button>
      </div>
    </card-component>
  `;
}
