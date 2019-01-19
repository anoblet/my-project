import { html, LitElement, property } from "lit-element";
import { until } from "lit-html/directives/until";
import { connect } from "pwa-helpers/connect-mixin.js";
import { config } from "../../../config";
import { BaseMixin } from "../../../packages/BaseMixin";
import { StateMixin } from "../../../packages/StateMixin";
import { Mixin } from "../../../packages/Mixin";
import { store } from "../../store";
import { TaskMixin } from "../../../packages/TaskMixin";
import Template from "./AppThemeTemplate";
import { FirebaseMixin } from "../../../packages/FirebaseMixin";
import * as style from "./AppTheme.scss";
import "../../../packages/my-grid/GridItem";
import { getCollection } from "../../../packages/firebase-helpers/firebase-helpers";
import { getDocument } from "../../../packages/firebase-helpers/firebase-helpers";
import { updateDocument } from "../../../packages/firebase-helpers/firebase-helpers";

const fields = [
  { name: "backgroundColor" },
  { name: "textColor" },
  { name: "linkColor" },
  { name: "borderColor" }
];

const data = async () => {
  const state = store.getState();
  return await getDocument({ path: `users/${state.user.uid}/settings/theme` });
};

const template = ({ currentTheme }: any) =>
  html`
    ${
      fields.map(
        (field: any) =>
          html`
            <input
              name="${field.name}"
              type="color"
              value="${currentTheme[field.name]}"
              @input="${(e: any) => updateField(field.name, e.target.value)}"
            />
          `
      )
    }
  `;

const updateField = (field: string, value: string) => {
  const state = store.getState();
  updateDocument({
    path: `users/${state.user.uid}/settings/theme`,
    data: { currentTheme: { [field]: value } }
  });
};

const setTheme = (theme: any) => {
  const state = store.getState();
  updateDocument({
    path: `users/${state.user.uid}/settings/theme`,
    data: { currentTheme: theme }
  });
};

export interface AppTheme {
  [key: string]: any; // Add index signature
}

/**
 * @todo Extend BaseElement
 */

export class AppTheme extends Mixin(connect(store)(LitElement), [
  BaseMixin,
  TaskMixin,
  StateMixin,
  FirebaseMixin
]) {
  darkTheme: any = {
    backgroundColor: "#242424",
    textColor: "#ffffff",
    primaryColor: "#00ff00",
    secondaryColor: "#ff0080"
  };
  lightTheme: any = {
    backgroundColor: "#ffffff",
    textColor: "#000000",
    primaryColor: "#00ff00",
    secondaryColor: "#ff0080"
  };
  miscTheme: any = {
    backgroundColor: "#534A71",
    borderColor: "#CCCCCC",
    primaryColor: "#4EE8EA",
    secondaryColor: "#5ECBC1",
    textColor: "#C2FB7C"
  };
  firebaseConfig = config.firebase;
  firebaseDocumentPath = "theme";
  stateType: any = "theme";

  savedThemes: any = [];

  // Lifecycle
  constructor() {
    super();
    this.setStore(store);
  }

  connectedCallback() {
    super.connectedCallback();
    this.runTasks([
      import(/* webpackChunkName: "MyFlex" */ "../../../packages/my-flex"),
      import(/* webpackChunkName: "MyGrid" */ "../../../packages/my-grid"),
      import(/* webpackChunkName: "MyLoader" */ "../../../packages/my-loader")
    ]);
  }

  firstUpdated() {
    if (this.state.theme.randomOnLoad) this.randomizeColors();
  }

  setTheme(theme: any) {
    console.log(theme);
    console.log(this[`${theme}Theme`]);
    const state = store.getState();
    updateDocument({
      path: `users/${state.user.uid}/settings/theme`,
      data: { currentTheme: this[`${theme}Theme`] }
    });
    // this.setState(this[`${theme}Theme`], "theme");
  }

  setDefaultTheme() {
    this.setState(this.defaultDocument, "theme");
  }

  randomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  randomizeColors() {
    const colors = {
      backgroundColor: this.randomColor(),
      textColor: this.randomColor(),
      primaryColor: this.randomColor(),
      secondaryColor: this.randomColor()
    };
    this.setState(colors, "theme");
  }

  randomOnLoadToggle() {
    const value = !this.state.theme.randomOnLoad;
    this.setState(
      {
        randomOnLoad: value
      },
      "theme"
    );
  }

  runtime() {
    if (this.state) {
      if (this.state.theme.randomOnLoad) this.randomizeColors();
    }
  }

  saveTheme() {
    const state = store.getState();
    const name = this.shadowRoot.querySelector("#themeName").value;
    if (name !== "")
      updateDocument({
        path: `users/${state.user.uid}/settings/theme/savedThemes/${name}`,
        data: state.theme
      });
    return;
    const theme = state.theme;
    let savedThemes = theme.savedThemes;
    if (!savedThemes) savedThemes = [];
    savedThemes.push({
      name: this.shadowRoot.querySelector("#themeName").value,
      backgroundColor: theme.backgroundColor,
      textColor: theme.textColor,
      primaryColor: theme.primaryColor,
      secondaryColor: theme.secondaryColor
    });
    this.setState({ savedThemes }, "theme");
  }

  setSavedTheme(index: any) {
    const state = store.getState();
    let savedThemes = state.theme.savedThemes;
    console.log(savedThemes);
    updateDocument({
      path: `users/${state.user.uid}/settings/theme`,
      data: { currentTheme: savedThemes[index] }
    });
  }

  listThemes() {
    const state = store.getState();
    const savedThemes = async () =>
      await getCollection({
        path: `users/${state.user.uid}/settings/theme/savedThemes/`
      });
    return html`
      <ul>
        ${
          until(
            savedThemes().then(
              themes => html`
                ${
                  themes.map(
                    (theme: any) =>
                      html`
                        <a @click="${() => setTheme(theme)}">${theme.id}</a>
                      `
                  )
                }
              `
            )
          )
        }
      </ul>
    `;
  }

  deleteTheme(index: any) {
    const savedThemes = this.state.theme.savedThemes;
    savedThemes.splice(index, 1);
    this.setState({ savedThemes }, "theme");
  }

  updateStyles(theme: any) {
    this.dispatchEvent(
      new CustomEvent("theme-changed", {
        bubbles: true,
        composed: true,
        detail: theme
      })
    );
  }

  stateChanged(state: any) {
    super.stateChanged(state);
    if (state.theme)
      if (state.user) {
        // updateDocument({
        //   path: `users/${state.user.uid}/settings/theme`,
        //   data: state.theme
        // });
      }
  }

  render() {
    const state = store.getState();
    return html`
      <style>
        ${style}
      </style>
      <grid-component style="flex: 1">
        ${
          state.app.settings.mode >= 1
            ? html`
                <card-component title="Current Theme">
                  ${until(data().then((data: any) => template(data)))}
                </card-component>
              `
            : ""
        }
        ${
          !this.taskPending
            ? Template.bind(this)(this.state)
            : html`
                <my-loader></my-loader>
              `
        }
      </grid-component>
    `;
  }
}

window.customElements.define("app-theme", AppTheme);
