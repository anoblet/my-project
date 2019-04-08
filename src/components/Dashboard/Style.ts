import { css } from "lit-element";

export default css`
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

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    text-transform: uppercase;
    transition: opacity 0.6s linear 0.4s;
  }
  .images-loaded .loading {
    opacity: 0;
  }

  card-component [slot="content"] {
    flex: 1;
  }
`;
