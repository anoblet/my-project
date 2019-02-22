declare global {
  interface Window {
    firebase: any;
  }
}

export const FirebaseMixin = (superClass: any) => {
  return class extends superClass {
    //   firebaseConfig: any;
    //   firebaseDocumentPath: any;
    //
    //   firebaseInit() {
    //     return import(/* webpackChunkName: "FirebaseApp" */ "firebase/app").then(
    //       app => {
    //         if (app.apps.length === 0) app.initializeApp(this.firebaseConfig);
    //       }
    //     );
    //   }
    //
    //   firestoreInit() {
    //     return Promise.all([
    //       import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
    //       import(/* webpackChunkName: "FirebaseStore" */ "firebase/firestore")
    //     ]).then(([firebase, firestore]) => {
    //       firebase.firestore().settings({ timestampsInSnapshots: true });
    //     });
    //   }
    //
    //   addDocument({ path, data }: any) {
    //     return Promise.all([
    //       import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
    //       import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
    //     ]).then(([firebase]) => {
    //       return firebase
    //         .firestore()
    //         .collection(path)
    //         .add(data)
    //         .then((docRef: any) => {
    //           return docRef.id;
    //         });
    //       // .catch((error: any) => {});
    //     });
    //   }
    //
    //   getCollection({ callback, path, watch = false }: any) {
    //     return new Promise((resolve, reject) => {
    //       Promise.all([
    //         import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
    //         import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
    //       ]).then(([firebase]) => {
    //         const firestore = firebase.firestore();
    //         firestore.settings({ timestampsInSnapshots: true });
    //         const collection = firestore.collection(path);
    //         if (watch) {
    //           collection.onSnapshot((querySnapshot: any) => {
    //             let result: any = [];
    //             querySnapshot.forEach(function(doc: any) {
    //               const data = doc.data();
    //               data.id = doc.id;
    //               result.push(data);
    //             });
    //             callback(result);
    //             resolve(() => alert("Hi"));
    //           });
    //         }
    //       });
    //     });
    //   }
    //
    //   // getDocument(
    //   //   path: any = "",
    //   //   config: any = {
    //   //     watch: true
    //   //   },
    //   //   callback: any
    //   // ) {
    //   //   return new Promise((resolve, reject) => {
    //   //     Promise.all([
    //   //       import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
    //   //       import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
    //   //     ]).then(async ([firebase]) => {
    //   //       const firestore = firebase.firestore();
    //   //       firestore.settings({ timestampsInSnapshots: true });
    //   //       const user: any = await this.getUser();
    //   //       if (!user) resolve();
    //   //       if (user) {
    //   //         if (!path) path = this.firebaseDocumentPath;
    //   //         const document = firestore.doc(`users/${user.uid}/state/${path}`);
    //   //         if (config.watch)
    //   //           return document.onSnapshot((doc: any) => {
    //   //             console.log("Here");
    //   //             const source = doc.metadata.hasPendingWrites
    //   //               ? "local"
    //   //               : "remote";
    //   //             if (callback) callback(doc.data());
    //   //             resolve(doc.data());
    //   //           });
    //   //         else
    //   //           document.get().then((doc: any) => {
    //   //             if (!doc.exists) document.set(this.defaultDocument);
    //   //             resolve(doc.data());
    //   //           });
    //   //       }
    //   //     });
    //   //   });
    //   // }
    //
    //   setDocument(data: any) {
    //     return new Promise((resolve, reject) => {
    //       Promise.all([
    //         import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
    //         import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
    //       ]).then(async ([firebase]) => {
    //         const firestore = firebase.firestore();
    //         firestore.settings({ timestampsInSnapshots: true });
    //         const user: any = await this.getUser();
    //         if (user) {
    //           const document = firestore.doc(
    //             `users/${user.uid}/state/${this.firebaseDocumentPath}`
    //           );
    //           document.set(data, { merge: true });
    //         }
    //       });
    //     });
    //   }
    //
    //   setDocumentNew({ path, data }: any) {
    //     return new Promise((resolve, reject) => {
    //       Promise.all([
    //         import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
    //         import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
    //       ]).then(async ([firebase]) => {
    //         const firestore = firebase.firestore();
    //         const document = firestore.doc(path);
    //         document.set(data, { merge: true });
    //       });
    //     });
    //   }
    //
    //   getUser() {
    //     return new Promise((resolve, reject) => {
    //       Promise.all([
    //         import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
    //         import(/* webpackChunkName: "FirebaseAuth" */ "firebase/auth"),
    //         import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore"),
    //         import(/* webpackChunkName: "FirebaseUI" */ "firebaseui")
    //       ]).then(async ([firebase, auth, firestore, ui]) => {
    //         const instance =
    //           ui.auth.AuthUI.getInstance() || new ui.auth.AuthUI(firebase.auth());
    //         const pendingRedirect = instance.isPendingRedirect();
    //         firebase.auth().onAuthStateChanged((user: any) => {
    //           if (!user && !pendingRedirect) resolve(false);
    //           if (user) {
    //             const userModel = {
    //               email: user.email,
    //               name: user.displayName,
    //               photo: user.photoURL,
    //               signedIn: true,
    //               uid: user.uid
    //             };
    //             resolve(userModel);
    //           }
    //         });
    //       });
    //     });
    //   }
    //
    //   deleteDocument({ path }: any) {
    //     return new Promise((resolve, reject) => {
    //       Promise.all([
    //         import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
    //         import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
    //       ]).then(async ([firebase]) => {
    //         const firestore = firebase.firestore();
    //         firestore.settings({ timestampsInSnapshots: true });
    //         const document = firestore.doc(path);
    //         document.delete();
    //       });
    //     });
    //   }
    //
    //   updateDocument({ path, data }: any) {
    //     return new Promise((resolve, reject) => {
    //       Promise.all([
    //         import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
    //         import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
    //       ]).then(async ([firebase]) => {
    //         const firestore = firebase.firestore();
    //         firestore.settings({ timestampsInSnapshots: true });
    //         const document = firestore.doc(path);
    //         document
    //           .set(data, { merge: true })
    //           .then((docRef: any) => {
    //             resolve();
    //           })
    //           .catch((error: any) => {
    //             reject(`Error adding document: ${error}`);
    //           });
    //       });
    //     });
    //   }
    //
    //   /**
    //    * [watchDocumentNew description]
    //    * @param  {path     [description]
    //    * @param  callback} [description]
    //    * @return           [description]
    //    */
    //   watchDocumentNew({ path, callback }: any) {
    //     return Promise.all([
    //       import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
    //       import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
    //     ]).then(([firebase]) => {
    //       const firestore = firebase.firestore();
    //       const document = firestore.doc(path);
    //       return new Promise((resolve, reject) => {
    //         document.onSnapshot((doc: any) => {
    //           const source = doc.metadata.hasPendingWrites ? "local" : "remote";
    //           callback(doc.data());
    //           resolve();
    //         });
    //       });
    //     });
    //   }
    //
    //   firebaseCheckRedirect() {
    //     return Promise.all([
    //       import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
    //       import(/* webpackChunkName: "FirebaseAuth" */ "firebase/auth"),
    //       import(/* webpackChunkName: "FirebaseUI" */ "firebaseui")
    //     ]).then(([app, auth, ui]) => {
    //       let instance =
    //         ui.auth.AuthUI.getInstance() || new ui.auth.AuthUI(app.auth());
    //       if (instance.isPendingRedirect()) {
    //         instance.start(document.createElement("div"), {});
    //       }
    //     });
    //   }
  };
};
