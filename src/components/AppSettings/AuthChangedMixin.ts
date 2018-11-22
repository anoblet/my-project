export const AuthChangedMixin = function (superClass: any) {
  return class extends superClass {
    signedIn: any;
    // No side effects
    registerAuthChangedCallback() {
      Promise.all([
        import(/* webpackChunkName: "FirebaseApp" */ 'firebase/app'),
        import(/* webpackChunkName: "FirebaseAuth" */ 'firebase/auth'),
      ]).then (([app]) => {
          app.auth().onAuthStateChanged((user: any) => {
            this.authChangedCallback(user);
        });      
      });
    }

    authChangedCallback(user: any) {
      console.log('Auth changed callback not defined');
      return;
    }
  }
}
