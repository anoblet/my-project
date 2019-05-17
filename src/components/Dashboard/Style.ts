import { css } from "lit-element";

export default css`
  :host {
    flex: 1;
  }

  .grid {
    position: relative;
    transition: opacity 0.8s linear 1s;
  }

  .images-loaded .grid {
    opacity: 1;
  }

  .item {
    position: absolute;
    margin: 5px;
    z-index: 1;
  }

  .item.muuri-item-hidden {
    z-index: 0;
  }

  .item.muuri-item-releasing {
    z-index: 2;
  }

  .item.muuri-item-dragging {
    z-index: 3;
  }

  .item-content {
    position: relative;
    cursor: pointer;
  }

  .item-content > img {
    display: block;
    border-radius: 6px;
  }

  card-component::part(content-container) {
    display: flex;
  }

  card-component [slot="content"] {
    flex: 1;
  }

  card-component {
    border: 1px solid var(--border-color);
    /* background: var(--background-color); */
  }

  .tall,
  .wide {
    display: flex;
  }

  .tall {
    width: 195px;
    height: 400px;
  }

  .wide {
    width: 400px;
    height: 195px;
  }
`;
