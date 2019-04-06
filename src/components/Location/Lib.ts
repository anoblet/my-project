import { html } from "lit-element";

export const getLocation = () => {
  return new Promise((resolve: any) => {
    navigator.geolocation.getCurrentPosition((position: any) => {
      resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  });
};

export const get = () => {
  return html`
    <button-component @click=${getLocation}>Get</button-component>
  `;
};
