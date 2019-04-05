export const getLocation = () => {
  return new Promise((resolve: any) => {
    return navigator.geolocation.getCurrentPosition((position: any) => {
      return resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  });
};
