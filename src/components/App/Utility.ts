import { database } from "../../Database";

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
