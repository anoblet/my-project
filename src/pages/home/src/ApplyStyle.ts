import { CSSResult, LitElement } from "lit-element";

/**
 * Takes a node, CSSResult and appends it
 */
export const applyStyle = (node: HTMLElement, style: CSSResult) => {
  if ("adoptedStyleSheets" in document && node.shadowRoot) {
    const sheets = node.shadowRoot.adoptedStyleSheets;
    node.shadowRoot.adoptedStyleSheets = [...sheets, style._styleSheet];
  } else {
    const styleNode = document.createElement("style");
    styleNode.textContent = style.cssText;
    if (node.shadowRoot) node.shadowRoot.appendChild(styleNode);
    else node.appendChild(styleNode);
  }
};
