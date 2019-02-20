import { getUser as _getUser } from "../packages/firebase-helpers";
import { getDocument } from "../packages/firebase-helpers/firebase-helpers";
import { navigate } from "./Router";
import { run } from "./Firebase";
import { setDefaultTheme } from "./Theme";
import { setState } from "../packages/state-helpers/state-helpers";
import { store } from "./Store";
import { toast } from "./components/ToastComponent/Toast";





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

export const isSignedIn = (fakeParam: any = "") => {
  const state = store.getState();
  return state.user.signedIn;
};

// export const isSignedIn = async () => {
//   await run(["auth"], (firebase: any) => {
//     new Promise(resolve => {
//       firebase.auth().onAuthStateChanged((user: any) => {
//         resolve(!!user);
//       });
//     });
//   });
// };

/**
 * Sign out clear /user in state and redirect to /
 * @param redirect - URL to redirect to after sign out. Defaults to "/"
 * @return void
 */

export const signOut = (redirect: any = "/") => {
  const _redirect = redirect || "/";
  run(["auth"]).then((firebase: any) => {
    firebase.auth().signOut();
  })
  // We could assume auth has already been called by now
  return Promise.all([
    import(/* webpackChunkName: "Firebase" */ "firebase/app"), // @ts-ignore
    import(/* webpackChunkName: "FirebaseAuth" */ "firebase/auth")
  ])
    .then(([firebase]) => {
      // Firebase sign out
      firebase.auth().signOut();
      // Reset state
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
      navigate("/");
    });
};

/**
 * Utility function to deal with a user
 */

const onUserLoggedIn = () => {};

export const getUser = (options: any) => {
  const user = _getUser(options);
  return extract(user);
};

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
  });
};

export const getUserSettings = (callback: any) => {
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
