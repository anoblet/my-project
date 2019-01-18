import { html, LitElement, property } from "lit-element";
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
import { updateDocument } from "../../../packages/firebase-helpers/firebase-helpers";
const firebase = window.firebase;

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
    borderColor: "#CCC",
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
    this.setState(this[`${theme}Theme`], "theme");
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
    const theme = this.state.theme;
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
    let savedThemes = this.state.theme.savedThemes;
    this.setState(savedThemes[index], "theme");
  }

  listThemes() {
    const savedThemes = this.state.theme.savedThemes;
    if (!savedThemes) return;
    return html`
      <ul>
        ${
          savedThemes.map(
            (theme: any, index: any) =>
              html`
                <li>
                  <a @click="${() => this.setSavedTheme(index)}"
                    >${theme.name}</a
                  >
                  <mwc-button
                    @click="${(e: any) => this.deleteTheme(index)}${index}"
                    >Delete</mwc-button
                  >
                </li>
              `
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
    if (state.user)
      updateDocument({
        path: `users/${state.user.uid}/state/theme`,
        data: state.theme
      });
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      ${
        !this.taskPending
          ? Template.bind(this)(this.state)
          : html`
              <my-loader></my-loader>
            `
      }
    `;
  }
}

window.customElements.define("app-theme", AppTheme);
