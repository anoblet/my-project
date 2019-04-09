// @ts-ignore
import census from "citysdk";

export const getFIPS = ({ latitude, longitude }) => {
  // @todo Fix browser/node irregularities
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
    (err: any, res: any) => console.log(res, err)
  );
  populationByState();
};

export const populationByState = () => {
  const states = [];
  return new Promise((resolve, reject) => {
    census(
      {
        vintage: "2017",
        geoHierarchy: {
          state: "*"
        },
        sourcePath: ["acs", "acs5"],
        values: ["B00001_001E"],
        geoResolution: "500k"
      },
      (error, result) => {
        result.features.map((feature: any) => {
          const properties = feature.properties;
          const state = {
            name: properties.NAME,
            population: properties["B00001_001E"]
          };
          states.push(state);
        });
        states.sort((a, b) => (a.name > b.name ? 1 : -1));
        resolve(states);
      }
    );
  });
};
