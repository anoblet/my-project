import { html } from "lit-element";
import {
  currentTemperature,
  detailedForecast,
  shortForecast,
  windDirection,
  windSpeed
} from "../Weather/Templates";

export default function() {
  return html`
    <style>
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
    </style>
    <div class="grid">
      <div class="item">
        <div class="item-content wide">
          <img src="https://placeimg.com/400/195/any?3" />
        </div>
      </div>
      <div class="item">
        <div class="item-content tall">
          ${currentTemperature({
            latitude: "40.7666688",
            longitude: "-73.961472"
          })}
        </div>
      </div>

      <div class="item">
        <div class="item-content wide">
          ${shortForecast({
            latitude: "40.7666688",
            longitude: "-73.961472"
          })}
        </div>
      </div>
      <div class="item">
        <div class="item-content tall">
          <img src="https://placeimg.com/195/400/any?2" />
        </div>
      </div>
      <div class="item">
        <div class="item-content tall">
          ${windDirection({
            latitude: "40.7666688",
            longitude: "-73.961472"
          })}
        </div>
      </div>
      <div class="item">
        <div class="item-content wide">
          <img src="https://placeimg.com/400/195/any?2" />
        </div>
      </div>
      <div class="item">
        <div class="item-content wide">
          ${detailedForecast({
            latitude: "40.7666688",
            longitude: "-73.961472"
          })}
        </div>
      </div>
      <div class="item">
        <div class="item-content tall">
          <img src="https://placeimg.com/195/400/any?3" />
        </div>
      </div>
      <div class="item">
        <div class="item-content tall">
          ${windSpeed({
            latitude: "40.7666688",
            longitude: "-73.961472"
          })}
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
