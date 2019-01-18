import { html } from "lit-element";
import(/* webpackChunkName: "ButtonComponent" */ "../ButtonComponent/ButtonComponent");

export default function() {
  return html`
    <grid-component>
      <card-component>
        <div><div class="character">${this.character}</div></div>
      </card-component>
      <card-component>
        <div slot="content">
          <button-component
            @click="${this.previous}"
            label="Previous"
          ></button-component>
          <button-component
            @click="${this.next}"
            label="Next"
          ></button-component>
        </div>
      </card-component>
      ${
        this.mode >= 1
          ? html`
              <card-component title="Development"
                ><div slot="content">
                  <button @click="${this.next}">Record answer</button> Index:
                  ${this.currentIndex} History: ${JSON.stringify(this.history)}
                </div></card-component
              >
            `
          : ""
      }
    </grid-component>
  `;
}
