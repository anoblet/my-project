import { addReducer } from "../../State";
import { database } from "../../Database";
import { store } from "../../Store";
import { debug, log } from "../../Debug";

export const getAppSettings = async (callback: any) => {
  log("Getting app level settings");
  const result = await new Promise((resolve: any, reject: any) =>
    database.getDocument({
      callback: (document: any) => {
        document
          ? resolve(callback(document))
          : reject(new Error("Could not retrieve settings"));
      },
      path: "app/settings",
      watch: true
    })
  );
  log("Finished getting app level settings");
  return result;
};

export const addDefaultReducers = () => {
  addReducer({ type: "app", store });
  addReducer({ type: "user", store });
  addReducer({ type: "settings", store });
};
