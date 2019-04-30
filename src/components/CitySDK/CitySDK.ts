import census from "citysdk";

const censusAsync = async (options: any) => {
  return new Promise((resolve, reject) => {
    census(options, (error: any, result: any) =>
      result ? resolve(result) : reject(error)
    );
  });
};

export const getFIPS = ({ latitude, longitude }) =>
  censusAsync({
    vintage: 2015,
    geoHierarchy: {
      county: {
        lat: latitude,
        lng: longitude
      }
    }
  });

export const populationByState = async (
  vintage: string,
  values: string = "B00001_001E"
) => {
  const states = [];
  const result: any = await censusAsync({
    vintage,
    geoHierarchy: {
      state: "*"
    },
    sourcePath: ["acs", "acs5"],
    values: [values],
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

export const populationByCountry = async () => {
  const result: any = await censusAsync({
    vintage: "2017",
    geoHierarchy: {
      us: "*"
    },
    sourcePath: ["acs", "acs1"],
    values: ["B01001_001E"],
    statsKey: "c97423c3f598951d2138d69861730b9154cd7230"
  });
  return result;
};
