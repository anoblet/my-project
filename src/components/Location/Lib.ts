import { html } from "lit-element";

export const getPosition = (success?: any, failure?: any) => {
  return getPositionCallback(success, failure);
};

export const getPositionCallback = (
  success: (position: { latitude: string; longitude: string }) => any,
  failure?: () => any
) => {
  navigator.geolocation.getCurrentPosition(
    (position: any) => {
      success(map(position));
    },
    failure,
    { timeout: 10000 }
  );
};

export const getPositionAsync = async () => {
  return new Promise((resolve: any, reject: any) => {
    navigator.geolocation.getCurrentPosition(
      (position: any) => {
        resolve(map(position));
      },
      reject,
      { timeout: 10000 }
    );
  });
};

export const getPositionTemplate = (success: (position: any) => any) => {
  return html`
    <button-component
      @click=${(e: any) => {
        const button = e.target;
        button.innerHTML = "Loading...";
        getPosition((position: any) => {
          success(position);
          button.innerHTML = "Success";
        });
      }}
      >Request permission</button-component
    >
  `;
};

const map = (position: any) => {
  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  };
};
