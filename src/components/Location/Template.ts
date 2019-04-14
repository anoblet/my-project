import { html } from "lit-element";

export default function() {
  return html`
    <grid-component>
      <button-component @click=${this.getLocation}
        >Request permission</button-component
      >
      <grid-component style="grid-template-columns: repeat(2, 1fr)">
        <div>Latitude:</div>
        <div>
          <input
            type="text"
            value=${this.latitude}
            @change=${this.latitudeChanged}
          />
        </div>
        <div>Longitude:</div>
        <div>
          <input
            type="text"
            value=${this.longitude}
            @change=${this.longitudeChanged}
          />
        </div>
      </grid-component>
    </grid-component>
  `;
}
