import {
  getCollection,
  updateDocument
} from "../../../packages/firebase-helpers";

import { html } from "lit-element";
import { toast } from "../../Toast";
import { until } from "lit-html/directives/until";

const getThemes = () => {
  return getCollection({
    path: "/users/m42gwHOSlbUniorNjigqa1nnHIE3/settings/theme/savedThemes"
  });
};

const updateTheme = (theme: any) =>
  updateDocument({
    path: `app/settings`,
    data: { defaultTheme: theme }
  })
    .then(() => toast("Theme updated"))
    .catch((error: any) => toast(error));

export const setTheme = () => {
  return html`
    <ul>
      ${until(
        getThemes().then(
          (themes: any) =>
            html`
              ${themes.map(
                (theme: any) =>
                  html`
                    <li @click="${() => updateTheme(theme)}">
                      <a href="">${theme.name}</a>
                    </li>
                  `
              )}
            `
        )
      )}
    </ul>
  `;
};
