import census from "citysdk";

const censusAsync = async (options: any) => {
  return new Promise((resolve, reject) => {
    census(options, (error, result) => {
      result ? resolve(result) : reject(error);
    });
  });
};

export const getFIPS = ({ latitude, longitude }) => {
  censusAsync({
    vintage: 2015,
    geoHierarchy: {
      county: {
        lat: latitude,
        lng: longitude
      }
    }
  });
};

export const populationByState = async () => {
  const states = [];
  const result: any = await censusAsync({
    vintage: "2017",
    geoHierarchy: {
      state: "*"
    },
    sourcePath: ["acs", "acs5"],
    values: ["B00001_001E"],
    geoResolution: "500k"
  });

  result.features.map((feature: any) => {
    const properties = feature.properties;
    const state = {
      name: properties.NAME,
      population: properties["B00001_001E"]
    };
    states.push(state);
  });
  states.sort((a, b) => (a.name > b.name ? 1 : -1));

  return states;
};

const populationByCountry = async () => {
  const result: any = await censusAsync({
    vintage: "2017",
    geoHierarchy: {
      state: "0"
    },
    sourcePath: ["acs", "acs5"],
    values: ["B00001_001E"],
    geoResolution: "500k"
  });
  console.log(result);
};
