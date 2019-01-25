export default () => {
  Promise.all([
    import(/* webpackChunkName: "FirebaseApp" */ "firebase/app"),
    import(/* webpackChunkName: "firebaseAuth" */ "firebase/auth")
  ]).then(([firebase]) => {
    firebase.auth().signOut();
  });
};
