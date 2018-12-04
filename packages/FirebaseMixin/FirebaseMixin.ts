// import * as firebase from 'firebase/app';
// import * as firestore from 'firebase/firestore';
// import * as auth from 'firebase/auth';

export const FirebaseMixin = function (superClass: any) {
  return class extends superClass {
    firebaseConfig: any;
    firebaseDocumentPath: any
    firebaseInit() {
      import(/* webpackChunkName: "FirebaseApp" */ 'firebase/app').then((app) => {
        if (app.apps.length === 0) app.initializeApp(this.firebaseConfig);
      });
    }

    getDocument(path: any = '', config: any = {
      watch: true
    }) {
      return new Promise((resolve, reject) => {
        Promise.all([
          import(/* webpackChunkName: "FirebaseApp" */ 'firebase/app'),
          import(/* webpackChunkName: "FirebaseFirestore" */ 'firebase/firestore'),
        ]).then(async ([firebase]) => {
          const firestore = firebase.firestore();
          firestore.settings({ timestampsInSnapshots: true });
          const user: any = await this.getUser();
          if(!user) resolve();
          if(user) {
            if(!path) path = this.firebaseDocumentPath;
            const document = firestore.doc(`users/${user.uid}/state/${path}`);
            if(config.watch)
            document.onSnapshot((doc: any) => {
              const source = doc.metadata.hasPendingWrites ? "local" : "remote";
              resolve(doc.data());
            });
            else
            document.get().then((doc: any) => {
              if(!doc.exists) document.set(this.defaultDocument);
              resolve(doc.data());
            });
          }
        });
      });
    }

    setDocument(data: any) {
      return new Promise((resolve, reject) => {
        Promise.all([
          import(/* webpackChunkName: "FirebaseApp" */ 'firebase/app'),
          import(/* webpackChunkName: "FirebaseFirestore" */ 'firebase/firestore'),
        ]).then(async ([firebase]) => {
          const firestore = firebase.firestore();
          firestore.settings({ timestampsInSnapshots: true });
          const user: any = await this.getUser();
          if(user) {
            const document = firestore.doc(`users/${user.uid}/state/${this.firebaseDocumentPath}`);
            document.set(data, {merge: true});
          }
        });
      });
    }

    getUser() {
      return new Promise((resolve, reject) => {
        Promise.all([
          import(/* webpackChunkName: "FirebaseApp" */ 'firebase/app'),
          import(/* webpackChunkName: "FirebaseAuth" */ 'firebase/auth'),
          import(/* webpackChunkName: "FirebaseFirestore" */ 'firebase/firestore'),
          import(/* webpackChunkName: "FirebaseUI" */ 'firebaseui'),
        ]).then(async ([firebase, auth, firestore, ui]) => {
          let instance = ui.auth.AuthUI.getInstance() || new ui.auth.AuthUI(firebase.auth());
          let pendingRedirect = instance.isPendingRedirect();
          firebase.auth().onAuthStateChanged((user: any) => {
            if (!user && !pendingRedirect) resolve(false);
            if (user) {
              const userModel: any = {};
              userModel.signedIn = true;
              userModel.uid = user.uid;
              userModel.name = user.displayName;
              userModel.email = user.email;
              userModel.photo = user.photoUrl;
              resolve(userModel);
            }
          });
        });
      });
    }
  }
}
