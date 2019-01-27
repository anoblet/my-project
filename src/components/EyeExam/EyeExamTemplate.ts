import { html } from "lit-element";
import { store } from "../../Store";
import { renderForm } from "../PropertyEditor/PropertyEditor";
import { properties } from "./Properties";
import(/* webpackChunkName: "ButtonComponent" */ "../ButtonComponent/ButtonComponent");
import(/* webpackChunkName: "ReportComponent" */ "./ReportComponent");

export default function() {
  // Refreshed on render
  const state = store.getState();

  return html`
    <grid-component>
      <card-component title="Properties"
        ><div slot="content">
          ${renderForm(this.constructor.properties, this)}
        </div></card-component
      >
      <card-component>
        ${!this.character
          ? html`
              <ol>
                <li>Click start</li>
                <li>Say a word that begins with the letter</li>
              </ol>
            `
          : html`
              <div class="relative">
                <div id="character" style="font-size: ${this.fontSize}">
                  ${this.character}
                </div>
                <div id="fontSize">
                  <input
                    type="text"
                    value="${this.fontSize}"
                    @change=${(e: any) => (this.fontSize = e.target.value)}
                  /><mwc-icon>edit</mwc-icon>
                </div>
              </div>
            `}
      </card-component>
      <card-component>
        <grid-component style="grid-template-columns: repeat(2, 1fr)">
          ${state.app.settings
            ? state.app.settings.mode >= 2
              ? html`
                  <button-component
                    @click="${this.handsOff}"
                    label="Hands off!"
                    style="grid-column: -1/1"
                  ></button-component>
                `
              : ""
            : ""}
          <button-component
            @click="${this.next}"
            label="Start"
            style="grid-column: -1/1"
          ></button-component>
          ${!this.hideNavigation
            ? html`
                <button-component
                  @click="${this.previous}"
                  label="Previous"
                ></button-component>
                <button-component
                  @click="${this.next}"
                  label="Next"
                ></button-component>
              `
            : ""}
          ${!this.hideRecord
            ? html`
                <button-component
                  @click="${this.record}"
                  label="Record answer"
                  style="grid-column: -1/1"
                ></button-component>
              `
            : ""}
          <button-component
            @click="${this.generateReport}"
            label="Generate report"
            style="grid-column: -1/1"
          ></button-component>
        </grid-component>
      </card-component>
      ${this.finished
        ? html`
            <card-component title="Report"
              ><div slot="content">
                <eye-exam-report .exam=${this.history}></eye-exam-report></div
            ></card-component>
          `
        : ""}
      ${this.mode >= 1
        ? html`
            <card-component title="Development"
              ><div slot="content">
                Current Index: ${this.currentIndex} History:
                <pre>${JSON.stringify(this.history, null, 2)}</pre>
              </div></card-component
            >
          `
        : ""}
    </grid-component>
  `;
}
