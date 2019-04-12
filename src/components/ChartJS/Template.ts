import { html } from "lit-element";

export default function() {
  return html`
      <div id="container">
        <canvas id="myChart"></canvas>
      </div>
    <button @click=${() => this.chart.resize()}>Resize</button>
  `;
}
