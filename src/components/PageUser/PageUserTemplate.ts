import "@material/mwc-fab";
import { html } from "lit-element";
import * as style from "./PageUser.scss";
import { until } from "lit-html/directives/until";

export default function({ user }: any) {
  return html`
    ${until(this.getActionTemplate(), "")}
  `;
}
