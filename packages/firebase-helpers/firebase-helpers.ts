import * as firebase from "firebase/app";
import * as firestore from "firebase/firestore";

export const getCollection = (path: string, options: any = {}) => {
  const firestore = firebase.firestore();
  firestore.settings({ timestampsInSnapshots: true });
  const collection = firestore.collection(path);
  return options.watch
    ? collection.onSnapshot((querySnapshot: any) => {
        let result: any = [];
        querySnapshot.forEach(function(doc: any) {
          const data = doc.data();
          data.id = doc.id;
          result.push(data);
        });
        if (options.callback) options.callback(result);
      })
    : collection.get().then((querySnapshot: any) => {
        let result: any = [];
        querySnapshot.forEach(function(doc: any) {
          const data = doc.data();
          data.id = doc.id;
          result.push(data);
        });
        if (options.callback) options.callback(result);
        return result;
      });
};

export const getDocument = (path: string, options: any) => {
  const firestore = firebase.firestore();
  const document = firestore.doc(path);
  return options.watch
    ? document.get((doc: any) => {
        const source = doc.metadata.hasPendingWrites ? "local" : "remote";
        options.callback(doc.data());
      })
    : document.onSnapshot((doc: any) => {
        const source = doc.metadata.hasPendingWrites ? "local" : "remote";
        options.callback(doc.data());
      });
};
