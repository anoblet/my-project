import { html } from "lit-element";
export default function() {
  return html`
    <my-grid id="content-grid">
      <card-component title="Components">
        <div slot="content">
          <ul>
            <a href="/components/eye-chart"><li>Eye Chart</li></a>
            <a href="/components/eye-test"><li>Eye Test</li></a>
            <a href="/components/web-speech"> <li>Web Speech API</li></a>
          </ul>
        </div></card-component
      >
    </my-grid>
  `;
}
