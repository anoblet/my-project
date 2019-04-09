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
  test();
};

const test = () => {
  census(
    {
      vintage: "2017",
      geoHierarchy: {
        county: "*"
      },
      sourcePath: ["acs", "acs5"],
      values: ["B19083_001E"], // GINI index
      statsKey: "c97423c3f598951d2138d69861730b9154cd7230",
      geoResolution: "500k"
    },
    (err: any, res: any) => console.log(res, err)
  );
};
