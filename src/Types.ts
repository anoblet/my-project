export const config = {
  firebase: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  },
  firebaseui: {
    signInSuccessUrl: "/",
    signInOptions: ["google.com", "anonymous"],
    tosUrl: "",
    privacyPolicyUrl: ""
  },
  github: {
    username: "",
    password: ""
  },
  site: {
    title: "Andrew Noblet"
  },
  staticTheme: true,
  theme: {
    backgroundColor: "#2d2d35",
    borderColor: "#808080",
    borderRadius: ".25em",
    borderSize: "1px",
    cardInnerPadding: "1em",
    gridGap: "1em",
    linkColor: "#15b4ff",
    padding: "1em",
    primaryColor: "#00ffff",
    secondaryColor: "#00ffff",
    textColor: "#D5F0EE"
  },
  globalSettings: false
};

export class Application {
  title: "Andrew Noblet";
}
