import { LitElement, customElement, property, html } from "lit-element";

import Style from "./Style";
import Template from "./Template";

const definitionDocument = {};

/**
 * Almanac class
 *
 * Instead of having a single hereditary source,
 * categories could be navigated horizontally
 * while topics could be navigated vertically.
 *
 * Position could be defined with an x,y value indicating category, topic
 * Horizontal navitation would reset y
 * @todo lazy-load documents one degree in any direction, re-run after position change
 */
@customElement("component-almanac")
export class Almanac extends LitElement {
  public static styles = Style;
  public render = Template.bind(this);

  public x = 0;
  public y = 0;

  public async loadDocument(categoryID, topicId) {
    // Definition document
    const routes = {
      Home: {
        path: "/",
        title: "Home"
      }
    };
  }

  // Handlers
  public swap(direction) {
    // const spread;
    const currentDocument = () => {
      switch (direction) {
        case "up": {
          this.y = this.y - 1;
        }
        case "right": {
          this.x = this.x + 1;
        }
        case "down": {
          this.y = this.y + 1;
        }
        case "left": {
          this.x = this.x - 1;
        }
      }
      return this.loadDocument(this.x, this.y);
    };
  }
}
