import * as firebase from 'firebase/app';
import * as firestore from 'firebase/firestore';
import * as auth from 'firebase/auth';
import { resolve } from 'dns';

export const FirebaseMixin = function (superClass: any) {
  return class extends superClass {
    firebaseConfig: any;
    firebaseDocumentPath: any
    initFirebase() {
      import(/* webpackChunkName: "FirebaseApp" */ 'firebase/app').then((app) => {
        if (app.apps.length === 0) app.initializeApp(this.firebaseConfig);
      });
    }

    getDocument(config: any = {
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
            const document = firestore.doc(`users/${user.uid}/${this.firebaseDocumentPath}`);
            if(config.watch)
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
            const document = firestore.doc(`users/${user.uid}/${this.firebaseDocumentPath}`);
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
              resolve(user);
            }
          });
        });
      });
    }
  }
}
