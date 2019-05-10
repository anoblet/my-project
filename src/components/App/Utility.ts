import { addReducer } from "../../State";
import { database } from "../../Database";
import { store } from "../../Store";

export const getAppSettings = (callback: any) => {
  return new Promise((resolve: any, reject: any) =>
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
};

export const addDefaultReducers = () => {
  addReducer({ type: "app", store });
  addReducer({ type: "user", store });
  addReducer({ type: "settings", store });
};
