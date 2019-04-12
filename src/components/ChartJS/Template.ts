import { html } from "lit-element";

export default function() {
  return html`
    <div class="absolute">
      <div id="container">
        <canvas id="myChart"></canvas>
      </div>
    </div>
    <button @click=${() => this.chart.resize()}>Resize</button>
  `;
}
