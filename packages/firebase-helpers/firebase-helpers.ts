declare global {
  interface Window {
    firebaseui: any;
  }
}

const firebaseui = window.firebaseui;

export const initApp = (config: any) => {
  return import(/* webpackChunkName: "Firebase" */ "firebase/app").then(firebase => {
    if (firebase.apps.length === 0) firebase.initializeApp(config);
  });
};

export const initStore = () => {
  return Promise.all([
    import(/* webpackChunkName: "Firebase" */ "firebase/app"),
    // @ts-ignore
    import(/* webpackChunkName: "FirebaseAuth" */ "firebase/firestore")
  ]).then(([firebase, firestore]) => {
    firebase.firestore().settings({ timestampsInSnapshots: true });
  });
};

/**
 * Needed so that after a signin has been processed,
 * on redirect, the form is added to capture the result
 * @return [description]
 *
 */
export const checkRedirect = () => {
  return Promise.all([
    import(/* webpackChunkName: "Firebase" */ "firebase/app"),
    // @ts-ignore
    import(/* webpackChunkName: "FirebaseAuth" */ "firebase/auth"),
    ,
    import(/* webpackChunkName: "FirebaseUI" */ "firebaseui")
  ]).then(([firebase, auth]) => {
    const instance =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    if (instance.isPendingRedirect()) {
      instance.start(document.createElement("div"), {});
    }
  });
};

/**
 * Only takes a callback that fires one the user status has been resolved
 *
 * Example: getUser((user: any) => console.log(user))
 *
 */
export const getUser = ({ callback }: any) => {
  return Promise.all([
    import(/* webpackChunkName: "Firebase" */ "firebase/app"),
    // @ts-ignore
    import(/* webpackChunkName: "FirebaseAuth" */ "firebase/auth"),
    ,
    import(/* webpackChunkName: "FirebaseUI" */ "firebaseui")
  ]).then(([firebase, auth]) => {
    const instance =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    // If true, the user has logged in, and Firebase UI is waiting to process it
    const pendingRedirect = instance.isPendingRedirect();
    firebase.auth().onAuthStateChanged((user: any) => {
      // If not logged in, or pending a redirect let's return false
      if (!user && !pendingRedirect) return callback(false);
      // User is logged in, let's return the user
      if (user) return callback(user);
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
 */
export const getCollection = ({ path, callback, watch, orderBy }: any) => {
  return Promise.all([
    import(/* webpackChunkName: "Firebase" */ "firebase/app"),
    // @ts-ignore
    import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
  ]).then(([firebase, firestore]) => {
  let collection = firebase.firestore().collection(path);
  // @ts-ignore
  if (orderBy) collection = collection.orderBy(orderBy);
  // Watch is enabled, let's use a callback
  if (watch)
    collection.onSnapshot((querySnapshot: any) => {
      let result: any = [];
      querySnapshot.forEach(function(doc: any) {
        const data = doc.data();
        data.id = doc.id;
        result.push(data);
      });
      if (callback) callback(result);
    });
  // Watch is diabled, let's return an array of objects
  else
    return collection.get().then((querySnapshot: any) => {
      let result: any = [];
      querySnapshot.forEach(function(doc: any) {
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
 *
 * Example: addDocument("posts", { title: "Sample title" })
 *
 */

export const addDocument = ({ path, data }: any) => {
  console.log("Adding document");
  return Promise.all([
    import(/* webpackChunkName: "Firebase" */ "firebase/app"),
    // @ts-ignore
    import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
  ]).then(([firebase]) => {
    return firebase.firestore()
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
 *
 * updateDocument({ path: "posts/<postId>", { title: "Sample title" } })
 *
 * @return
 */

export const updateDocument = ({ path, data }: any) => {
  console.log("Updating document");
  return Promise.all([
    import(/* webpackChunkName: "Firebase" */ "firebase/app"),
    // @ts-ignore
    import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
  ]).then(([firebase]) => {
    const document = firebase.firestore().doc(path);
    return document.set(data, { merge: true });
  });
};

/**
 * Returns a promise/document, or calls a callback depending on the watch property
 */
export const getDocument = ({ callback, path, watch }: any) => {
  return Promise.all([
    import(/* webpackChunkName: "Firebase" */ "firebase/app"),
    // @ts-ignore
    import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
  ]).then(([firebase]) => {
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
 */
export const deleteDocument = ({ path }: any) => {
  return Promise.all([
    import(/* webpackChunkName: "Firebase" */ "firebase/app"),
    // @ts-ignore
    import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
  ]).then(([firebase]) => {
  return firebase.firestore()
    .doc(path)
    .delete()
    .then(() => console.log("Document deleted"))
    .catch((error: any) => console.log("Could not delete document", error));
  });
};

const load = (depends: any = [], callback: any) => {
  let modules: any = [
    import(/* webpackChunkName: "Firebase" */ "firebase/app")
  ];
  if (depends.includes("auth"))
    modules.push(
      // @ts-ignore
      import(/* webpackChunkName: "FirebaseAuth" */ "firebase/auth")
    );
  if (depends.includes("firestore"))
    modules.push(
      // @ts-ignore
      import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
    );

  Promise.all(modules).then(([firebase]) => callback(firebase));
};
