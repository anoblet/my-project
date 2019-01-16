import * as firebase from "firebase/app";
import * as firestore from "firebase/firestore";

/**
 * Returns either an array of documents, or fires a callback depending on whether or not watch is true
 * @return Array | Void
 */
export const getCollection = ({ path, callback, watch, orderBy }: any) => {
  const firestore = firebase.firestore();
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

export const updateDocument = ({ path, data }: any) => {
  const firestore = firebase.firestore();
  const document = firestore.doc(path);
  document.set(data, { merge: true });
};

/**
 * Returns a promise/document, or calls a callback depending on the watch property
 */
export const getDocument = ({ callback, path, options = {} }: any) => {
  const firestore = firebase.firestore();
  const document = firestore.doc(path);
  return options.watch
    ? document.get((doc: any) => {
        const source = doc.metadata.hasPendingWrites ? "local" : "remote";
        return doc.data();
      })
    : document.onSnapshot((doc: any) => {
        const source = doc.metadata.hasPendingWrites ? "local" : "remote";
        callback(doc.data());
      });
};
