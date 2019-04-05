const geoSuccess = () => {
  return;
};
const geoError = () => {
  return;
};

export const getLocation = () => {
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};
