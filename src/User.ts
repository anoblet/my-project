import { store } from "./Store";
import { setState } from "../packages/state-helpers/state-helpers";
import { navigate } from "./Router";
import { toast } from "./components/ToastComponent/Toast";
import { getDocument } from "../packages/firebase-helpers/firebase-helpers";
import { setTheme, documentToStyle } from "./Theme";

export const isAdmin = () => {
  const state = store.getState();
  return state.user.uid === "m42gwHOSlbUniorNjigqa1nnHIE3";
};

export const resetState = () => {
  setState({ config: { merge: false }, data: {}, store, type: "app" });
};

export const isSignedIn = (fakeParam: any = "") => {
  const state = store.getState();
  return state.user.signedIn;
};

/**
 * Sign out clear /user in state and redirect to /
 * @param redirect - URL to redirect to after sign out. Defaults to "/"
 * @return void
 */

export const signOut = (redirect: any = "/") => {
  const _redirect = redirect || "/";
  // We could assume auth has already been called by now
  return Promise.all([
    import(/* webpackChunkName: "Firebase" */ "firebase/app"), // @ts-ignore
    import(/* webpackChunkName: "FirebaseAuth" */ "firebase/auth")
  ])
    .then(([firebase, auth]) => {
      // Firebase sign out
      firebase.auth().signOut();
      // Reset state
      setState({
        config: { merge: false },
        data: {},
        store,
        type: "user"
      });
    })
    .then(() => {
      toast("Signed out");
      // Navigate index
      navigate("/");
    });
};

/**
 * Utility function to deal with a user
 */

const onUserLoggedIn = () => {};

export const getUserTheme = (callback: any) => {
  const user = store.getState().user;
  return new Promise(resolve => {
    return getDocument({
      path: `users/${user.uid}/settings/theme`,
      callback: (document: any) => {
        resolve(document ? callback(document.currentTheme) : false);
      },
      watch: true
    });
  })
};

export const getUserSettings = async (callback: any) => {
  const user = store.getState().user;
  return new Promise(resolve =>
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
