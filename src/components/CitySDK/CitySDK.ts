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

export const fieldByState = async () => {
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

export const getVintages = async () => {
  const result: any = await fetch("https://api.census.gov/data/").then(function(
    response
  ) {
    return response.json();
  });
  const unsortedArray = [];
  result.dataset.map((data: any) => {
    const vintage = data["c_vintage"];
    if (vintage && !unsortedArray.includes(vintage))
      unsortedArray.push(vintage);
  });
  return unsortedArray.sort((a, b) => a - b);
};

export const getPrograms = async (vintage: string) => {
  const result: any = await fetch(
    `https://api.census.gov/data/${vintage}`
  ).then(function(response) {
    return response.json();
  });
  const unsortedArray = [];
  result.dataset.map((data: any) => {
    const title = data["title"];
    if (title && !unsortedArray.includes(title)) unsortedArray.push(title);
  });
  return unsortedArray.sort((a, b) => a - b);
};
