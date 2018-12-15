import "@material/mwc-fab";
import { html } from "@polymer/lit-element";
import * as style from "./PageHome.scss";
import { until } from "lit-html/directives/until";

export default function({ user }: any) {
  return html`
    <style>
      ${style}
    </style>
    <my-grid id="content-grid">
      <my-card collapsible style="grid-column: 1/-1">
        <h3 slot="title">Welcome</h3>
        <div slot="content">
          Welcome ${user.name ? user.name : "Guest"}! ${
    !user.signedIn
      ? html`
          <a href="/user">Sign in</a> to save settings
        `
      : html`
          You are currently signed in: Your settings will now be saved
        `
  }.
          <p>
            This package provides:
            <ul>
              <li>StateMixin</li>
                <ul>
                  <li>setStore(store: any) Sets a store(component specific)</li>
                  <li>addReducer(type: any, customFunction: any = false): Defines a namespace, assigns a reducer</li>
                  <li>setState(data: any, type: any, config: any = {merge: true}): Sets the state, merging by default
                </ul>
              <li>FirebaseMixin</li>
              <li>TaskMixin</li>
            </ul>
          </p>
          <p>
            This package uses:
            <ul>
              <li>firebase</li>
              <li>lit-element</li>
              <li>lit-redux-router</li>
              <li>redux</li>
            </ul>
          </p>
        </div>
      </my-card>
      <my-card collapsible style="grid-column: 1/-1">
        <h3 slot="title">Lorem Ipsum</h3>
        <div slot="content">
          <lorem-ipsum count="100"></lorem-ipsum>
        </div>
      </my-card>
    </my-grid>
  `;
}
