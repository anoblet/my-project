import { css } from "lit-element";

export const style = css`
  :host {
    display: flex;
    flex: 1;
    position: absolute;
    left: 0;
    right: 0;
    max-width: 100%;
  }

  #chart {
    flex: 1;
  }

  .absolute {
    flex: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

export default style;
