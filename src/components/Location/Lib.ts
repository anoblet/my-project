import { html } from "lit-element";

export const getPosition = (
  success: (position: { latitude: string; longitude: string }) => any,
  failure?: () => any
) => {
  navigator.geolocation.getCurrentPosition((position: any) => {
    success({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, failure());
};

export const getPositionAsync = async () => {
  return new Promise((resolve: any, reject: any) => {
    navigator.geolocation.getCurrentPosition((position: any) => {
      resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, reject());
  });
};

export const getPositionTemplate = (success: (position) => any) => {
  return html`
    <button-component @click=${() => getPosition(success)}
      >Get location</button-component
    >
  `;
};

export const summaryTemplate = (position: any) => html`
  <grid-component> <span>label</span><span>value</span> </grid-component>
`;
