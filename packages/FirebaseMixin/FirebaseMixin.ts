// import * as firebase from 'firebase/app';
// import * as firestore from 'firebase/firestore';
// import * as auth from 'firebase/auth';

export const FirebaseMixin = function(superClass: any) {
  return class extends superClass {
    firebaseConfig: any;
    firebaseDocumentPath: any;
    firebaseInit() {
      import(/* webpackChunkName: "FirebaseApp" */ "firebase/app").then(app => {
        if (app.apps.length === 0) app.initializeApp(this.firebaseConfig);
      });
    }

    addDocument({ path, data }: any) {
      return new Promise((resolve, reject) => {
        Promise.all([
          import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
          import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
        ]).then(async ([firebase]) => {
          const firestore = firebase.firestore();
          firestore.settings({ timestampsInSnapshots: true });
          firestore
            .collection(path)
            .add(data)
            // .doc()
            // .set(data)
            .then(function(docRef: any) {
              resolve(docRef.id);
            })
            .catch(function(error: any) {
              reject(`Error adding document: ${error}`);
            });
        });
      });
    }

    getAppDocument(
      path: any = "",
      config: any = {
        watch: true
      },
      callback: any
    ) {
      return new Promise((resolve, reject) => {
        Promise.all([
          import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
          import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
        ]).then(async ([firebase]) => {
          const firestore = firebase.firestore();
          firestore.settings({ timestampsInSnapshots: true });
          const user: any = await this.getUser();
          if (!user) resolve();
          if (user) {
            if (!path) path = this.firebaseDocumentPath;
            const document = firestore.doc(path);
            if (config.watch)
              return document.onSnapshot((doc: any) => {
                const source = doc.metadata.hasPendingWrites
                  ? "local"
                  : "remote";
                if (callback) callback(doc.data());
                resolve(doc.data());
              });
            else
              document.get().then((doc: any) => {
                if (!doc.exists) document.set(this.defaultDocument);
                resolve(doc.data());
              });
          }
        });
      });
    }

    getCollection({ callback, path, watch = false }: any) {
      return new Promise((resolve, reject) => {
        Promise.all([
          import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
          import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
        ]).then(([firebase]) => {
          const firestore = firebase.firestore();
          firestore.settings({ timestampsInSnapshots: true });
          const collection = firestore.collection(path);
          if (watch) {
            collection.onSnapshot((querySnapshot: any) => {
              let result: any = [];
              querySnapshot.forEach(function(doc: any) {
                const data = doc.data();
                data.id = doc.id;
                result.push(data);
              });
              callback(result);
              resolve(() => alert("Hi"));
            });
          }
        });
      });
    }

    getDocument(
      path: any = "",
      config: any = {
        watch: true
      },
      callback: any
    ) {
      return new Promise((resolve, reject) => {
        Promise.all([
          import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
          import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
        ]).then(async ([firebase]) => {
          const firestore = firebase.firestore();
          firestore.settings({ timestampsInSnapshots: true });
          const user: any = await this.getUser();
          if (!user) resolve();
          if (user) {
            if (!path) path = this.firebaseDocumentPath;
            const document = firestore.doc(`users/${user.uid}/state/${path}`);
            if (config.watch)
              return document.onSnapshot((doc: any) => {
                console.log("Here");
                const source = doc.metadata.hasPendingWrites
                  ? "local"
                  : "remote";
                if (callback) callback(doc.data());
                resolve(doc.data());
              });
            else
              document.get().then((doc: any) => {
                if (!doc.exists) document.set(this.defaultDocument);
                resolve(doc.data());
              });
          }
        });
      });
    }

    setDocument(data: any) {
      return new Promise((resolve, reject) => {
        Promise.all([
          import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
          import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
        ]).then(async ([firebase]) => {
          const firestore = firebase.firestore();
          firestore.settings({ timestampsInSnapshots: true });
          const user: any = await this.getUser();
          if (user) {
            const document = firestore.doc(
              `users/${user.uid}/state/${this.firebaseDocumentPath}`
            );
            document.set(data, { merge: true });
          }
        });
      });
    }

    setDocumentNew({ path, data }: any) {
      return new Promise((resolve, reject) => {
        Promise.all([
          import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
          import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
        ]).then(async ([firebase]) => {
          const firestore = firebase.firestore();
          firestore.settings({ timestampsInSnapshots: true });
          const document = firestore.doc(path);
          document.set(data, { merge: true });
        });
      });
    }

    getUser() {
      return new Promise((resolve, reject) => {
        Promise.all([
          import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
          import(/* webpackChunkName: "FirebaseAuth" */ "firebase/auth"),
          import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore"),
          import(/* webpackChunkName: "FirebaseUI" */ "firebaseui")
        ]).then(async ([firebase, auth, firestore, ui]) => {
          let instance =
            ui.auth.AuthUI.getInstance() || new ui.auth.AuthUI(firebase.auth());
          let pendingRedirect = instance.isPendingRedirect();
          firebase.auth().onAuthStateChanged((user: any) => {
            if (!user && !pendingRedirect) resolve(false);
            if (user) {
              const userModel: any = {};
              userModel.signedIn = true;
              userModel.uid = user.uid;
              userModel.name = user.displayName;
              userModel.email = user.email;
              userModel.photo = user.photoURL;
              resolve(userModel);
            }
          });
        });
      });
    }

    deleteDocument({ path }: any) {
      return new Promise((resolve, reject) => {
        Promise.all([
          import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
          import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
        ]).then(async ([firebase]) => {
          const firestore = firebase.firestore();
          firestore.settings({ timestampsInSnapshots: true });
          const document = firestore.doc(path);
          document.delete();
        });
      });
    }

    updateDocument({ path, data }: any) {
      return new Promise((resolve, reject) => {
        Promise.all([
          import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
          import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
        ]).then(async ([firebase]) => {
          const firestore = firebase.firestore();
          firestore.settings({ timestampsInSnapshots: true });
          const document = firestore.doc(path);
          document.set(data, { merge: true });
        });
      });
    }

    watchDocument(document: any, callback: any) {
      return Promise.all([
        import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
        import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
      ]).then(async ([firebase]) => {
        const firestore = firebase.firestore();
        firestore.settings({ timestampsInSnapshots: true });
        const user: any = await this.getUser();
        if (!user) {
          callback();
          return;
        } else {
          if (!document) document = this.firebaseDocumentPath;
          const firestoreDocument = firestore.doc(
            `users/${user.uid}/state/${document}`
          );
          return firestoreDocument.onSnapshot((doc: any) => {
            const source = doc.metadata.hasPendingWrites ? "local" : "remote";
            if (callback) callback(doc.data());
          });
        }
      });
    }

    watchDocumentNew({ path, callback }: any) {
      return Promise.all([
        import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
        import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
      ]).then(async ([firebase]) => {
        const firestore = firebase.firestore();
        firestore.settings({ timestampsInSnapshots: true });
        const document = firestore.doc(path);
        document.onSnapshot((doc: any) => {
          const source = doc.metadata.hasPendingWrites ? "local" : "remote";
          if (callback) callback(doc.data());
        });
      });
    }

    firebaseCheckRedirect() {
      return new Promise((resolve, reject) => {
        Promise.all([
          import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
          import(/* webpackChunkName: "FirebaseAuth" */ "firebase/auth"),
          import(/* webpackChunkName: "FirebaseUI" */ "firebaseui")
        ]).then(([app, auth, ui]) => {
          let instance =
            ui.auth.AuthUI.getInstance() || new ui.auth.AuthUI(app.auth());
          if (instance.isPendingRedirect()) {
            instance.start(document.createElement("div"), {});
          }
          resolve();
        });
      });
    }
  };
};
