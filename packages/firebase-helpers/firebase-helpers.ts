import { run } from "../../src/Firebase";

/**
 * Utility functions for Firebase
 **/

/**
 * Should be run once and only once since it instantiates Firebase
 *  - Should be of type <firebaseConfig> (How the hell would I type that anyways :P)
 * @param  config
 * @return Promise
 **/
export const initApp = (config: any) => {
  run([]).then((firebase: any) => {
    if (firebase.apps.length === 0) firebase.initializeApp(config);
  });
};

/**
 * @param void
 * @return Promise
 * - [Deprecated in 0.0.2] { timestampsInSnapshots: true } is no longer needed
 **/

export const initStore = () => {
  run([]).then((firebase: any) => {
    firebase.firestore().settings({ timestampsInSnapshots: true });
  });
};

/**
 * Needed so that after a signin has been processed,
 * on redirect, the form is added to capture the result
 * @return [description]
 **/
export const checkRedirect = async () => {
  return new Promise((resolve: any) => {
    return Promise.all([
      import(/* webpackChunkName: "Firebase" */ "firebase/app"),
      import(/* webpackChunkName: "Firebase" */ "firebase/auth"),
      import(/* webpackChunkName: "FirebaseUI" */ "firebaseui")
    ]).then(async ([firebase, auth, firebaseui]) => {
      const instance =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(firebase.auth());
      const _pendingRedirect = instance.isPendingRedirect();
      if (!_pendingRedirect) resolve();
      else {
        instance.start(document.createElement("div"), {});
        firebase.auth().onAuthStateChanged((user: any) => {
          if (user) return resolve();
        });
      }
    });
  });
};

/**
 * Only takes a callback that fires once the user status has been resolved
 * Example: getUser((user: any) => console.log(user))
 **/
export const getUser = ({ callback }: any) => {
  return new Promise((resolve: any) => {
    run(["auth"]).then(async (firebase: any) => {
      const _pendingRedirect = await pendingRedirect();
      if (_pendingRedirect) resolve(false);
      firebase.auth().onAuthStateChanged((user: any) => {
        resolve(callback(user));
      });
    });
  });
};

/**
 * Returns either an array of documents, or fires a callback depending on whether or not watch is true
 * @return Array | Void
 *
 * Examples:
 *
 * Single-use promise
 * getCollection({path: "posts", orderBy: "date"}).then((colleciton: any) => console.log(collection))
 *
 * Multi-use callback
 * getCollection({callback: (collection)=> console.log(collection), path: "posts", orderBy: "date", watch: true})
 **/
export const getCollection = ({ path, callback, watch, orderBy }: any) => {
  return run(["firestore"]).then((firebase: any) => {
    let collection = firebase.firestore().collection(path);
    // @ts-ignore
    if (orderBy) collection = collection.orderBy(orderBy);
    // Watch is enabled, let's use a callback
    if (watch)
      collection.onSnapshot((querySnapshot: any) => {
        const result: any = [];
        querySnapshot.forEach((doc: any) => {
          const data = doc.data();
          data.id = doc.id;
          result.push(data);
        });
        if (callback) callback(result);
      });
    // Watch is diabled, let's return an array of objects
    else
      return collection.get().then((querySnapshot: any) => {
        const result: any = [];
        querySnapshot.forEach((doc: any) => {
          const data = doc.data();
          data.id = doc.id;
          result.push(data);
        });
        return result;
      });
  });
};

/**
 * Add a document to a collection
 * @return The document ID
 * @todo Return DocRef
 * Example: addDocument("posts", { title: "Sample title" })
 **/
export const addDocument = ({ path, data }: any) => {
  return run(["firestore"]).then((firebase: any) => {
    return firebase
      .firestore()
      .collection(path)
      .add(data)
      .then((docRef: any) => {
        return docRef.id;
      });
  });
};

/**
 * Update or create a document
 *
 * Example:
 * updateDocument({ path: "posts/<postId>", { title: "Sample title" } })
 * @return
 **/

export const updateDocument = ({ data, path }: any) => {
  // console.log("Updating document");
  return run(["firestore"]).then((firebase: any) => {
    return firebase
      .firestore()
      .doc(path)
      .set(data, { merge: true });
  });
};

/**
 * Returns a promise/document, or calls a callback depending on the watch property
 **/
export const getDocument = ({ callback, path, watch }: any) => {
  return run(["firestore"]).then((firebase: any) => {
    const document = firebase.firestore().doc(path);
    return watch
      ? document.onSnapshot((doc: any) => {
          const source = doc.metadata.hasPendingWrites ? "local" : "remote";
          callback(doc.data());
        })
      : document.get().then((doc: any) => {
          return doc.data();
        });
  });
};

/**
 * Delete document
 * @param  path Document path inside of Firebase
 * @return      Promise
 **/
export const deleteDocument = ({ path }: any) => {
  return run(["firestore"]).then((firebase: any) => {
    return firebase
      .firestore()
      .doc(path)
      .delete();
  });
};

const pendingRedirect = async () => {
  return Promise.all([
    import(/* webpackChunkName: "Firebase" */ "firebase/app"), // @ts-ignore
    import(/* webpackChunkName: "Firebase" */ "firebase/auth"),
    import(/* webpackChunkName: "FirebaseUI" */ "firebaseui")
  ]).then(([firebase, auth, firebaseui]) => {
    const instance =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    return instance.isPendingRedirect();
  });
};
