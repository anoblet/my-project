import "../Clock/Component";

import { detailedForecast, windSpeed } from "../Weather/Templates";

import { Forecast } from "@anoblet/weather";
import { html } from "lit-element";
import { until } from "lit-html/directives/until";

const period = new Forecast("40.7666688", "-73.961472").getPeriod(0);

export default function() {
  return html`
    <div class="grid">
      <div class="item">
        <div class="item-content tall">
          <card-component>
            <span slot="title">Clock</span>
            <div class="centered" slot="body">
              <clock-component></clock-component>
            </div>
          </card-component>
        </div>
      </div>
      <div class="item">
        <div class="item-content wide">
          <img src="https://placeimg.com/400/195/any?3" />
        </div>
      </div>
      <div class="item">
        <div class="item-content tall">
          <card-component>
            <span slot="title">Temperature</span>
            <div class="centered" slot="body">
              ${until(period.then(period => period.temperature))}
            </div>
          </card-component>
        </div>
      </div>

      <div class="item">
        <div class="item-content wide">
          <card-component>
            <span slot="title">Short forecast</span>
            <div class="centered" slot="body">
              ${until(period.then(period => period.shortForecast))}
            </div>
          </card-component>
        </div>
      </div>
      <div class="item">
        <div class="item-content tall">
          <img src="https://placeimg.com/195/400/any?2" />
        </div>
      </div>
      <div class="item">
        <div class="item-content tall">
          <card-component>
            <span slot="title">Wind direction</span>
            <div class="centered" slot="body">
              ${until(period.then(period => period.windDirection))}
            </div>
          </card-component>
        </div>
      </div>
      <div class="item">
        <div class="item-content wide">
          <img src="https://placeimg.com/400/195/any?2" />
        </div>
      </div>
      <div class="item">
        <div class="item-content wide">
          <card-component>
            <span slot="title">Detailed forecast</span>
            <div class="centered" slot="body">
              ${until(period.then(period => period.detailedForecast))}
            </div>
          </card-component>
        </div>
      </div>
      <div class="item">
        <div class="item-content tall">
          <img src="https://placeimg.com/195/400/any?3" />
        </div>
      </div>
      <div class="item">
        <div class="item-content tall">
          <card-component>
            <span slot="title">Wind speed</span>
            <div class="centered" slot="body">
              ${until(period.then(period => period.windSpeed))}
            </div>
          </card-component>
        </div>
      </div>
      <div class="item">
        <div class="item-content wide">
          <img src="https://placeimg.com/400/195/any?4" />
        </div>
      </div>
    </div>
  `;
}
