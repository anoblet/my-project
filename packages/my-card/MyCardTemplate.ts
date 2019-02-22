import { html } from "lit-element";
import style from "./MyCard.scss";

export default function(props: any) {
  return html`
    <style>${style}</style>
    <div id="title">
      <slot name="title"></slot>
      ${this.collapsible ? html`<mwc-icon>${this.collapsed ? "expand_more" : "expand_less"}</mwc-icon>` : ""}
    </div>
    <div class="border flex scroll" id="content">
      <div class="flex padding">
        <slot name="content" class="scroll"></slot>
      </div>
    </div>
  `;
}
