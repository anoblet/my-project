import { getUser as _getUser } from "../packages/firebase-helpers";
import { getDocument } from "../packages/firebase-helpers/firebase-helpers";
import { navigate } from "./Router";
import { run } from "./Firebase";
import { setDefaultTheme } from "./Theme";
import { setState } from "../packages/state-helpers/state-helpers";
import { store } from "./Store";
import { toast } from "./components/Toast/Toast";

/**
 * Check if a user is an admin
 * @return Boolean
 */
export const isAdmin = () => {
  const state = store.getState();
  return state.user.uid === "m42gwHOSlbUniorNjigqa1nnHIE3";
};

export const resetState = () => {
  setState({ config: { merge: false }, data: {}, store, type: "app" });
};

export const isSignedIn = () => {
  const state = store.getState();
  return state.user.signedIn;
};

/**
 * Sign out clear /user in state and redirect to /
 * @param redirect - URL to redirect to after sign out. Defaults to "/"
 * @return void
 */

export const signOut = async (redirect: any = "/") => {
  const _redirect = "/";
  return run(["auth"])
    .then((firebase: any) => {
      firebase.auth().signOut();
      // Reset state
      setState({
        config: { merge: false },
        data: {},
        store,
        type: "settings"
      });
      setState({
        config: { merge: false },
        data: {},
        store,
        type: "user"
      });
      setDefaultTheme();
    })
    .then(() => {
      toast("Signed out");
      // Navigate index
      navigate(_redirect);
    });
};

/**
 * Utility function to deal with a user
 */

export const onUserLoggedIn = () => {
  return true;
};

export const getUser = (options: any) => {
  const user = _getUser(options);
  return extract(user);
};

export const getUserTheme = (callback: any) => {
  const user = store.getState().user;
  return new Promise((resolve: any) => {
    return getDocument({
      path: `users/${user.uid}/settings/theme`,
      callback: (document: any) => {
        resolve(document ? callback(document.currentTheme) : false);
      },
      watch: true
    });
  });
};

export const getUserSettings = (callback: any) => {
  const user = store.getState().user;
  return new Promise((resolve: any) =>
    getDocument({
      path: `users/${user.uid}/settings/default`,
      callback: (document: any) => {
        document ? resolve(callback(document)) : resolve(false);
      },
      watch: true
    })
  );
};

export const extract = (user: any) => {
  return {
    email: user.email,
    name: user.displayName,
    photo: user.photoURL,
    signedIn: true,
    uid: user.uid
  };
};
