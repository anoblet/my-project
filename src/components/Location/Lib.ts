import { html } from "lit-element";

export const getPosition = (
  success: (position) => any,
  failure?: () => any
) => {
  navigator.geolocation.getCurrentPosition((position: any) => {
    success({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  });
};

export const getPositionAsync = async () => {
  return new Promise((resolve: any) => {
    navigator.geolocation.getCurrentPosition((position: any) => {
      resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  });
};

export const getPositionTemplate = (success: (position) => any) => {
  return html`
    <button-component @click=${() => getPosition(success)}
      >Get</button-component
    >
  `;
};

export const summaryTemplate = (position: any) => html`
  <grid-component> <span>label</span><span>value</span> </grid-component>
`;
