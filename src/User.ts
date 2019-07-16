import { getUser as _getUser, getDocument } from "./Firebase";
import { navigate } from "./Router";
import { run } from "./Firebase";
import { setDefaultTheme } from "./Theme";
import { setState, state } from "./State";
import { store } from "./Store";
import { toast } from "./components/Toast/Toast";

/**
 * Check if a user is an admin
 * @return Boolean
 */
export const isAdmin = () => {
  const _state = store.getState();
  return _state.user.uid === "m42gwHOSlbUniorNjigqa1nnHIE3";
};

/**
 * Reset user Redux info
 * @return void
 */
export const resetState = () => {
  setState({ config: { merge: false }, data: {}, store, type: "user" });
};

/**
 * Check if the user is signed in
 * @return Boolean
 */
export const isSignedIn = () => {
  return user.get().signedIn;
};

/**
 * Sign out clear /user in state and redirect to /
 * @param redirect - URL to redirect to after sign out. Defaults to "/"
 * @return void
 */

export const signOut = async () => {
  const _redirect = "/";
  return run(["auth"])
    .then((firebase: any) => {
      firebase.auth().signOut();
      // Reset state
      setState({
        merge: false,
        data: {},
        store,
        type: "settings"
      });
      setState({
        merge: false,
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

/**
 * Gets user object from Redux
 * @return object
 */
export const getUser = () => {
  const stateUser = store.getState().user;
  if (stateUser) return stateUser;
  else {
    const _user = _getUser();
    return extract(_user);
  }
};

export const getUserTheme = (callback?: any) => {
  const _user = store.getState().user;
  return new Promise((resolve: any) => {
    return getDocument({
      path: `users/${_user.uid}/settings/theme`,
      callback: (document: any) => {
        resolve(
          document
            ? callback
              ? callback(document.currentTheme)
              : document.currentTheme
            : false
        );
      },
      watch: true
    });
  });
};

/**
 * Just an async to get a theme document
 * @return [description]
 */
export const getTheme = async (uid: string) => {
  return await new Promise((resolve, reject) => {
    return getDocument({
      path: `users/${uid}/settings/theme`,
      callback: (document: any) => {
        resolve(document ? document.currentTheme : false);
      },
      watch: true
    });
  });
};

export const getUserSettings = () => {
  const _user = store.getState().user;
  return new Promise((resolve: any) => {
    getDocument({
      path: `users/${_user.uid}/settings/default`,
      callback: (document: any) => {
        document ? resolve(document) : resolve(false);
      },
      watch: true
    });
    // getDocument({
    //   path: `users/${_user.uid}/settings/default`,
    //   callback: (document: any) => {
    //     document ? resolve(callback(document)) : resolve(false);
    //   },
    //   watch: true
    // })
  });
};

export const extract = (_user: any) => {
  return {
    email: _user.email,
    name: _user.displayName,
    photo: _user.photoURL,
    signedIn: true,
    uid: _user.uid
  };
};

export const get = () => {
  return state.get().user;
};

export const getIp = async () => {
  return fetch("https://api.ipify.org?format=json")
    .then(response => {
      return response.json();
    })
    .then(data => data.ip);
};

export const user = {
  extract,
  get,
  getTheme,
  getUserSettings,
  getUserTheme,
  isAdmin,
  reset: resetState
};

export default user;
