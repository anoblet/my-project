import { html, LitElement, property } from "lit-element";
import { until } from "lit-html/directives/until";
import { store } from "../../store";
import { getCollection } from "../../../packages/firebase-helpers/firebase-helpers";
import { getDocument } from "../../../packages/firebase-helpers/firebase-helpers";
import globalStyle from "../../Styles";
import themeEdit from "./ThemeEdit";

const properties = [
  { label: "Background color", property: "backgroundColor" },
  { label: "Text color", property: "textColor" },
  { label: "Link color", property: "linkColor" },
  { label: "Border color", property: "borderColor" },
  { label: "Primary color", property: "primaryColor" },
  { label: "Secondary color", property: "secondaryColor" }
];

const getThemePath = () => {
  const state = store.getState();
  return `users/${state.user.uid}/settings/theme`;
};

const theme = async () => {
  return await getDocument({ path: getThemePath() });
};

const saveTheme = (name: string) => {
  const state = store.getState();
  const theme = state.theme;
};

export class ThemeComponent extends LitElement {
  @property({ type: Array }) savedThemes: any;

  firstUpdated() {
    const state = store.getState();
    getCollection({
      callback: (themes: any) => {
        this.savedThemes = themes;
      },
      path: `/users/${state.user.uid}/settings/theme/savedThemes`,
      watch: true
    });
  }

  static get styles() {
    return [globalStyle];
  }

  public render() {
    const state = store.getState();
    return html`
      <grid-component>
        <card-component title="Current theme">
          ${themeEdit({ fields: properties, theme: state.theme })}
        </card-component>
        <card-component>
          <input id="name" placeholder="Theme name" type="text" />
          <button @click="${saveTheme}">Save theme</button>
        </card-component>
        ${
          this.savedThemes
            ? html`
                <card-component title="Saved themes">
                  <div slot="content">
                    <ul>
                      ${
                        this.savedThemes.map(
                          (theme: any) =>
                            html`
                                  <li>${theme.id}</lid>
                                `
                        )
                      }
                    </ul>
                  </div>
                </card-component>
              `
            : ""
        }
      </grid-component>
    `;
  }
}

window.customElements.define("theme-component", ThemeComponent);
