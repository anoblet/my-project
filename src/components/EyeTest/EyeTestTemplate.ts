import { html } from "lit-element";
import { store } from "../../store";
import(/* webpackChunkName: "ButtonComponent" */ "../ButtonComponent/ButtonComponent");

export default function() {
  return html`
    <grid-component>
      <card-component>
        <div><div class="character">${this.character}</div></div>
      </card-component>
      <card-component>
        <grid-component style="grid-template-columns: repeat(2, 1fr)">
          ${
            store.getState().app.settings.mode >= 2
              ? html`
                  <button-component
                    @click="${this.handsOff}"
                    label="Hands off!"
                    style="grid-column: -1/1"
                  ></button-component>
                `
              : ""
          }
          <button-component
            @click="${this.previous}"
            label="Previous"
          ></button-component>
          <button-component
            @click="${this.next}"
            label="Next"
          ></button-component>
          <button-component
            @click="${this.record}"
            label="Record answer"
            style="grid-column: -1/1"
          ></button-component>
        </grid-component>
      </card-component>
      ${
        this.mode >= 1
          ? html`
              <card-component title="Development"
                ><div slot="content">
                  Current Index: ${this.currentIndex} History:
                  <pre>${JSON.stringify(this.history, null, 2)}</pre>
                </div></card-component
              >
            `
          : ""
      }
    </grid-component>
  `;
}
