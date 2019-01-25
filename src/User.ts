export class User {
  signOut() {
    return Promise.all([
      import(/* webpackChunkName: "Firebase" */ "firebase/app"),
      // @ts-ignore
      import(/* webpackChunkName: "FirebaseAuth" */ "firebase/auth")
    ]).then(([firebase, auth]) => {
      firebase.auth().signOut();
    });
  }
}
