import { html } from "lit-element";
import("../../../packages/PellComponent/PellComponent");
export default function({ user }: any) {
  return html`
    <my-grid id="content-grid"> <blog-component> </blog-component> </my-grid>
  `;
}
