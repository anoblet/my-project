// import * as firebase from "firebase/app";
// import * as firestore from "firebase/firestore";

declare global {
  interface Window {
    firebase: any;
    firebaseui: any;
  }
}

const firebase = window.firebase;
const firestore = firebase.firestore();
const firebaseui = window.firebaseui;

export const initApp = (config: any) => {
  if (firebase.apps.length === 0) firebase.initializeApp(config);
};

export const initStore = () => {
  firebase.firestore().settings({ timestampsInSnapshots: true });
};

/**
 * Needed so that after a signin has been processed,
 * on redirect, the form is added to capture the result
 * @return [description]
 */
export const checkRedirect = () => {
  let instance =
    firebaseui.auth.AuthUI.getInstance() ||
    new firebaseui.auth.AuthUI(firebase.auth());
  if (instance.isPendingRedirect()) {
    instance.start(document.createElement("div"), {});
  }
};

export const getUser = ({ callback }: any) => {
  const instance =
    firebaseui.auth.AuthUI.getInstance() ||
    new firebaseui.auth.AuthUI(firebase.auth());
  const pendingRedirect = instance.isPendingRedirect();
  firebase.auth().onAuthStateChanged((user: any) => {
    // If not logged in, or pending a redirect let's return false
    if (!user && !pendingRedirect) return callback(false);
    // User is logged in, let's return the user
    if (user) return callback(user);
  });
};

/**
 * Returns either an array of documents, or fires a callback depending on whether or not watch is true
 * @return Array | Void
 */
export const getCollection = ({ path, callback, watch, orderBy }: any) => {
  firestore.settings({ timestampsInSnapshots: true });
  let collection = firestore.collection(path);
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
};

/**
 * [firestore description]
 * @return A promise which resolves to the id of added document
 */

export const addDocument = ({ path, data }: any) => {
  return firestore
    .collection(path)
    .add(data)
    .then((docRef: any) => {
      return docRef.id;
    });
};

export const updateDocument = ({ path, data }: any) => {
  const document = firestore.doc(path);
  return document.set(data, { merge: true });
};

/**
 * Returns a promise/document, or calls a callback depending on the watch property
 */
export const getDocument = ({ callback, path, watch }: any) => {
  const document = firestore.doc(path);
  return watch
    ? document.onSnapshot((doc: any) => {
        const source = doc.metadata.hasPendingWrites ? "local" : "remote";
        callback(doc.data());
      })
    : document.get().then((doc: any) => {
        return doc.data();
      });
};

/**
 * Delete document
 * @param  path Document path inside of Firebase
 * @return      Promise
 */
export const deleteDocument = ({ path }: any) => {
  return firestore
    .doc(path)
    .delete()
    .then(() => console.log("Document deleted"))
    .catch((error: any) => console.log("Could not delete document", error));
};
