export const config = {
  firebaseui: {
    signInSuccessUrl: "/",
    signInOptions: ["google.com", "anonymous"],
    tosUrl: "",
    privacyPolicyUrl: ""
  },
  site: {
    title: "Andrew Noblet"
  },
  staticTheme: true,
  theme: {
    backgroundColor: "#313131",
    borderColor: "#dbdbdb",
    borderRadius: ".25em",
    borderSize: "1px",
    borderWidth: "1px",
    buttonColor: "#ff0080",
    cardInnerPadding: "1em",
    gridGap: "1em",
    h3Color: "#00ffff",
    linkColor: "#ff0080",
    padding: "1em",
    primaryColor: "#ff0080",
    secondaryColor: "#00ffff",
    textColor: "#dfdfdf"
  },
  globalSettings: false,
  analytics: true
};

export default config;
