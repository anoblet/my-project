const firebase = window.firebase;

export class User {
  signOut() {
    firebase.auth().signOut();
  }
}
