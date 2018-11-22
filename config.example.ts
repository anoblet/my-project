export const config = {
  firebase: {
    apiKey: "<api-key>",
    authDomain: "<project-id>.firebaseapp.com",
    databaseURL: "https://<project-id>.firebaseio.com",
    projectId: "<project-id>",
    storageBucket: "",
    messagingSenderId: "<messaging-sender-id>"
  },
  firebaseui: {
    signInSuccessUrl: '/',
    signInOptions: [
      'google.com',
      'facebook.com',
      'twitter.com',
      'github.com',
      'password',
      'phone',
      'anonymous',
    ],
    tosUrl: '<your-tos-url>',
    privacyPolicyUrl: function () {
      window.location.assign('<your-privacy-policy-url>');
    }
  }
}