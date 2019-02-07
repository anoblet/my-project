import { store } from "./Store";
import { setState } from "../packages/state-helpers/state-helpers";
import { navigate } from "./Router";
import { toast } from "./components/ToastComponent/Toast";

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
