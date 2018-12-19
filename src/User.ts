export class User {
  signOut() {
    Promise.all([
      import(/* webpackChunkName: "FirebaseApp" */ "firebase/app")
    ]).then(([firebase]) => {
      firebase.auth().signOut();
    });
  }
}
