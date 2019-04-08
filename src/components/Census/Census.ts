import census from "citysdk";

export const getFIPS = ({ latitude, longitude }) => {
  census(
    {
      vintage: 2015,
      geoHierarchy: {
        county: {
          lat: latitude,
          lng: longitude
        }
      }
    },
    (err, res) => console.log(res)
  );
};
