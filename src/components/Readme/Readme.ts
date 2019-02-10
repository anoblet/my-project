import { html } from "lit-element";
import { until } from "lit-html/directives/until";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { mdToHtml } from "../../../packages/Showdown/Showdown";

export const getReadme = (path: string) => {
  return html`
    ${until(
      fetch(
        path
      )
        .then((response) => response.text())
        .then((document: any) => {
          return html`
            ${unsafeHTML(mdToHtml(document))}
          `;
        })
    )}
  `;
};
