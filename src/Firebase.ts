export const run = async (packages: any) => {
  const imports: any = [];
  imports.push(import(/* webpackChunkName: "Firebase" */ "firebase/app"));
  if (packages.includes("auth"))
    imports.push(
      import(/* webpackChunkName: "Firebase" */ "firebase/auth")
    );
  if (packages.includes("firestore"))
    imports.push(
      import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
    );
  return Promise.all(imports).then(([firebase]) => firebase);
};

export const authRedirect = async () => {
  return run(["auth"]).then((firebase: any) => {
    const auth = firebase.auth();
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
  return run(["auth"]).then((firebase: any) => {
    return new Promise((resolve: any) => {
      firebase.auth().onAuthStateChanged((user: any) => {
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
export const getCollection = async ({ path, callback, watch, orderBy }: any) => {
  return Promise.all([
    import(/* webpackChunkName: "Firebase" */ "firebase/app"), // @ts-ignore
    import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
  ]).then(async ([firebase, firestore]) => {
    const collection = firebase.firestore().collection(path);
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
