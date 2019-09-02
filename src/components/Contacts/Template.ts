import { html } from "lit-element";
import { printContent } from "../../Utility";
import { close } from "@anoblet/material-icons";

export default function() {
  return html`
    <card-component title="Contacts">
      <grid-component>
        <card-component
          >Monitor eye-contacts (RGP or rigid gas permeable lens)
          usage</card-component
        >
        <card-component>
          <grid-component id="buttons">
            <button-component label="In" @click=${this.in}></button-component>
            <button-component label="Out" @click=${this.out}></button-component>
          </grid-component>
        </card-component>
        <card-component>
          <grid-component id="log">
            ${this.data.log.map(
              (item: any, index: number) => html`
                <div>
                  ${item.type}
                </div>
                <div class="center">
                  ${new Date(item.time).toLocaleString()}
                </div>
                <div>
                  <button-component @click=${() => this.deleteItem(index)}
                    >${close}</button-component
                  >
                </div>
              `
            )}
          </grid-component>
          <!-- <button-component
            label="Print"
            @click=${() => printContent(this)}
          ></button-component> -->
        </card-component>
      </grid-component>
    </card-component>
  `;
}
