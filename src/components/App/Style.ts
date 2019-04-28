import { css } from "lit-element";

export default css`
  * {
    box-sizing: border-box;
  }

  :host {
    display: flex;
    flex: 1;
    flex-direction: column;
    background: var(--background-color);
    color: var(--text-color);
    font-family: Roboto, sans-serif;
  }

  :host([dark]) {
    --background-color: #242424;
    --text-color: #9e9e9e;
    --border-color: #9e9e9e;
    --primary-color: #242424;
    --secondary-color: #fff;
  }

  :host([debug]) {
    --debug-padding: 1em;
    --debug-border: 1px solid var(--border-color);
  }

  app-drawer-absolute {
    min-width: 50%;
  }

  #drawer {
    box-shadow: var(--box-shadow);
  }

  #drawer[media-size="mobile"] {
    position: absolute;
    background: var(--background-color);
    height: 100%;
    z-index: 3;
    border: 0;
    border-right: 1px solid var(--border-color);
    padding-right: 1.20em;
  }

  #drawer-container {
    flex: 1;
    position: relative;
    grid-gap: 0;
  }

  [full-height] {
    height: 100%;
  }

  #drawer[hidden] {
    display: none;
  }

  :host([drawer-opened]) #drawer-container:not([media-size="mobile"]) {
    grid-template-columns: minmax(min-content, auto) 4fr;
  }

  #container {
    flex: 1;
    grid-template-rows: min-content 1fr min-content;
  }

  #top,
  #bottom {
    align-items: center;
    justify-content: space-between;
  }

  #top {
    padding: 1em 1.25em !important;
  }

  #bottom {
    position: fixed;
    bottom: 0;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    z-index: 2;
    align-items: center;
    justify-content: center;
    padding: 0 1em 0.5em !important;
  }

  #content-grid {
    padding-right: 1em;
    content: initial;
  }

  #center {
    display: flex;
    flex: 1;
    overflow: auto;
    position: relative;
  }

  #content {
    flex-direction: column;
    position: relative;
  }

  mwc-icon {
    color: var(--mdc-theme-primary);
  }

  ul {
    list-style-type: none;
    padding-inline-start: 0;
  }

  .pad {
    padding: 1em !important;
  }

  .scroll {
    overflow: auto;
  }

  #profile-menu {
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-top: 0;
    border-right: 0;
    position: absolute;
    right: 0;
    z-index: 1;
    padding: 1em 2em 2em 1em;
  }

  #profile-menu li {
    padding-bottom: 0.25em;
  }

  breadcrumb-component a {
    display: block;
  }

  #made-with {
    text-align: center;
  }

  #menu {
    cursor: pointer;
    padding: 1em;
  }

  #menu:hover,
  #userProfile {
    cursor: pointer;
  }

  #content-grid {
    margin-left: 1em;
    /* height: 100%; */
  }

  #portal {
    contain: initial;
  }

  #content {
    overflow-y: auto;
  }
`;
