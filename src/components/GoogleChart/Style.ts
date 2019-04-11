import { css } from "lit-element";

export const style = css`
  :host {
    display: block;
    flex: 1;
    position: relative;
  }

  #chart {
    flex: 1;
    position: absolute;
    left: 0;
    right: 0;
  }
`;

export default style;
