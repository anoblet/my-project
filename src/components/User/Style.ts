import { css } from "lit-element";

export default css`
  :host {
    display: flex;
    flex: 1;
  }

  .firebaseui-container {
    background: none !important;
  }

  .mdl-shadow--2dp {
    box-shadow: none;
  }

  .firebaseui-info-bar {
    margin-top: 20px;
  }

  div.mdl-progress::after {
    display: block;
    color: var(--primary-color);
    content: "Authenticating";
    margin: 20px auto;
    text-align: center;
  }

  .mdl-progress {
    height: 5px;
  }
`;
