import * as firebase from "firebase/app";
import "firebase/auth";

export const init = async (config: any) => {
  firebase.initializeApp(config);
};

/**
 * Gets user
 */
export const getUser = async () => {
  return await new Promise((resolve: any) => {
    firebase.auth().onAuthStateChanged((user: any) => {
      resolve(user);
    });
  });
};
