import { html } from "lit-element";
import { store } from "../../Store";
import { renderForm } from "../PropertyEditor/PropertyEditor";
import { properties } from "./Properties";
import { filterByMode } from "../../Debug";
import { isAdmin } from "../../User"; // isAdmin is a function not a property and may be re-evaluate on each render

// Components
import(/* webpackChunkName: "ButtonComponent" */ "../ButtonComponent/ButtonComponent");
import(/* webpackChunkName: "ReportComponent" */ "./ReportComponent");

export default function() {
  // Refreshed on render
  const state = store.getState();

  return html`
    <grid-component>
      ${isAdmin()
        ? html`
            <card-component collapsed collapsible title="Properties"
              ><div slot="content">
                ${renderForm(
                  this,
                  null,
                  (property: string, value: any) => (this[property] = value)
                )}
              </div></card-component
            >
          `
        : ""}
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
                <div id="character" style="font-size: ${this.startGontSize}">
                  ${this.character}
                </div>
                ${false
                  ? html`
                      <div id="fontSize">
                        <input
                          type="text"
                          value="${this.fontSize}"
                          @change=${(e: any) =>
                            (this.fontSize = e.target.value)}
                        /><mwc-icon>edit</mwc-icon>
                      </div>
                    `
                  : ""}
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
          ${this.showNavigation
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
          ${this.showRecord
            ? html`
                <button-component
                  @click="${this.record}"
                  label="Record answer"
                  style="grid-column: -1/1"
                ></button-component>
              `
            : ""}
          ${false
            ? html`
                <button-component
                  @click="${this.generateReport}"
                  label="Generate report"
                  style="grid-column: -1/1"
                ></button-component>
              `
            : ""}
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
      ${this.showHistory
        ? html`
            <card-component title="Development"
              ><div slot="content">
                History:
                <pre>${JSON.stringify(this.history, null, 2)}</pre>
                Report:
                <pre>${JSON.stringify(this.report, null, 2)}</pre>
                Current Index: ${this.currentIndex}
              </div></card-component
            >
          `
        : ""}
    </grid-component>
  `;
}
