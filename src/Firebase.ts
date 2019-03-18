import { _console } from "./Debug";

export const run = async (packages: any) => {
  const imports: any = [];
  imports.push(import(/* webpackChunkName: "Firebase" */ "firebase/app"));
  if (packages.includes("auth"))
    imports.push(import(/* webpackChunkName: "Firebase" */ "firebase/auth"));
  if (packages.includes("firestore"))
    imports.push(
      import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
    );
  return Promise.all(imports).then(([_firebase]) => _firebase);
};

export const authRedirect = async () => {
  return run(["auth"]).then((_firebase: any) => {
    const auth = _firebase.auth();
    return auth.getRedirectResult().then((result: any) => {
      return result.user;
    });
  });
};

/**
 * Gets user from Firebase if it exists
 * @return Promise
 */
export const getUser = async () => {
  return run(["auth"]).then((_firebase: any) => {
    return new Promise((resolve: any) => {
      _firebase.auth().onAuthStateChanged((user: any) => {
        resolve(user);
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
export const getCollection = async ({
  path,
  callback,
  watch,
  orderBy
}: any) => {
  return Promise.all([
    import(/* webpackChunkName: "Firebase" */ "firebase/app"), // @ts-ignore
    import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
  ]).then(async ([_firebase]) => {
    const collection = _firebase.firestore().collection(path);
    if (orderBy) collection.orderBy(orderBy);
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
 * Update or create a document
 *
 * Example:
 * updateDocument({ path: "posts/<postId>", { title: "Sample title" } })
 * @return
 **/

export const updateDocument = async ({ data, path }: any) => {
  _console("Updating document");
  return run(["firestore"]).then((_firebase: any) => {
    return _firebase
      .firestore()
      .doc(path)
      .set(data, { merge: true });
  });
};

/**
 * Returns a promise/document, or calls a callback depending on the watch property
 **/
export const getDocument = ({ callback, path, watch }: any) => {
  return run(["firestore"]).then((_firebase: any) => {
    const document = _firebase.firestore().doc(path);
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
 * Should be run once and only once since it instantiates Firebase
 *  - Should be of type <firebaseConfig> (How the hell would I type that anyways :P)
 * @param  config
 * @return Promise
 **/
export const initApp = (config: any) => {
  run([]).then((_firebase: any) => {
    if (_firebase.apps.length === 0) _firebase.initializeApp(config);
  });
};

/**
 * Delete document
 * @param  path Document path inside of Firebase
 * @return      Promise
 **/
export const deleteDocument = ({ path }: any) => {
  return run(["firestore"]).then((_firebase: any) => {
    return _firebase
      .firestore()
      .doc(path)
      .delete();
  });
};

/**
 * Add a document to a collection
 * @return The document ID
 * @todo Return DocRef
 * Example: addDocument("posts", { title: "Sample title" })
 **/
export const addDocument = ({ path, data }: any) => {
  return run(["firestore"]).then((_firebase: any) => {
    return _firebase
      .firestore()
      .collection(path)
      .add(data)
      .then((docRef: any) => {
        return docRef.id;
      });
  });
};

export const firebase = { getDocument, run, update: updateDocument };
