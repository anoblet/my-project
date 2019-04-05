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
