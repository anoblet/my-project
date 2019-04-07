import { html } from "lit-element";

export const getPosition = (success?: any, failure?: any) => {
  console.log("1");
  return getPositionCallback(success, failure);
};

export const getPositionCallback = (
  success: (position: { latitude: string; longitude: string }) => any,
  failure?: () => any
) => {
  navigator.geolocation.getCurrentPosition((position: any) => {
    console.log(position);
    success(map(position));
  }, failure);
};

export const getPositionAsync = async () => {
  return new Promise((resolve: any, reject: any) => {
    navigator.geolocation.getCurrentPosition((position: any) => {
      resolve(map(position));
    }, reject);
  });
};

export const getPositionTemplate = (success: (position: any) => any) => {
  return html`
    <button-component @click=${() => getPosition(success)}
      >Get location</button-component
    >
  `;
};

const map = (position: any) => {
  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  };
};
