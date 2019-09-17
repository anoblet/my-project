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
    backgroundColor: "#000000",
    borderColor: "#dbdbdb",
    borderRadius: ".25em",
    borderSize: "1px",
    borderWidth: "1px",
    buttonColor: "#ff0080",
    cardInnerPadding: "1em",
    gridGap: "1em",
    h3Color: "#E91E63",
    linkColor: "#81D4FA",
    padding: "1em",
    primaryColor: "#ff0080",
    secondaryColor: "#313131",
    textColor: "#dfdfdf"
  },
  globalSettings: false,
  analytics: true
};

export default config;
