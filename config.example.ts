export const config = {
  defaultTheme: {
    backgroundColor: "#ffffff",
    borderColor: "#c0c0c0",
    primaryColor: "#666666",
    secondaryColor: "#000000",
    textColor: "#000000"
  },
  firebase: {
    apiKey: "<api-key>",
    authDomain: "<project-id>.firebaseapp.com",
    databaseURL: "https://<project-id>.firebaseio.com",
    projectId: "<project-id>",
    storageBucket: "",
    messagingSenderId: "<messaging-sender-id>"
  },
  firebaseui: {
    signInSuccessUrl: "/",
    signInOptions: [
      "google.com",
      "facebook.com",
      "twitter.com",
      "github.com",
      "password",
      "phone",
      "anonymous"
    ],
    tosUrl: "<your-tos-url>",
    privacyPolicyUrl: () => {
      window.location.assign("<your-privacy-policy-url>");
    }
  }
};
