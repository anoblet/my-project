import { html } from "lit-element";
import { currentTemperature } from "../Weather/CurrentTemperature";
export default function() {
  return html`
    <div class="grid">
      <div class="item">
        <div class="item-content" style="width: 195px; height: 400px">
          ${currentTemperature({
            latitude: "40.7666688",
            longitude: "-73.961472"
          })}
        </div>
      </div>
      <div class="item">
        <div class="item-content">
          <img
            src="https://placeimg.com/400/195/any?2"
            width="400"
            height="195"
          />
        </div>
      </div>
      <div class="item">
        <div class="item-content">
          <img
            src="https://placeimg.com/195/400/any?3"
            width="195"
            height="400"
          />
        </div>
      </div>
      <div class="item">
        <div class="item-content">
          <img
            src="https://placeimg.com/400/195/any?4"
            width="400"
            height="195"
          />
        </div>
      </div>
      <div class="item">
        <div class="item-content">
          <img
            src="https://placeimg.com/195/400/any?5"
            width="195"
            height="400"
          />
        </div>
      </div>
      <div class="item">
        <div class="item-content">
          <img
            src="https://placeimg.com/400/195/any?6"
            width="400"
            height="195"
          />
        </div>
      </div>
      <div class="item">
        <div class="item-content">
          <img
            src="https://placeimg.com/195/400/any?7"
            width="195"
            height="400"
          />
        </div>
      </div>
      <div class="item">
        <div class="item-content">
          <img
            src="https://placeimg.com/400/195/any?8"
            width="400"
            height="195"
          />
        </div>
      </div>
      <div class="item">
        <div class="item-content">
          <img
            src="https://placeimg.com/195/400/any?9"
            width="195"
            height="400"
          />
        </div>
      </div>
    </div>
  `;
}
