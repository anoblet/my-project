export const components = [
  {
    label: "Voice",
    src: () =>
      import(/* webpackChunklabel: "Voice" */ "./components/VoiceComponent"),
    tag: "voice-component"
  },
  {
    label: "Collection List",
    src: () =>
      import(/* webpackChunklabel: "ComponentList" */ "./components/Collection/CollectionList"),
    tag: "collection-list"
  },
  {
    label: "Philips Hue",
    src: () =>
      import(/* webpackChunklabel: "PhilipsHue" */ "./components/PhilipsHue/LightsComponent"),
    tag: "lights-component"
  },
  {
    label: "Philips Hue Demo",
    src: () =>
      import(/* webpackChunklabel: "PhilipsHueDemo" */ "./components/PhilipsHue/Demo"),
    tag: "philips-hue-demo"
  },
  {
    label: "Eye Exam",
    src: () =>
      import(/* webpackChunklabel: "EyeExam" */ "./components/EyeExam/EyeExamComponent"),
    tag: "eye-exam"
  },
  {
    label: "Color Picker",
    src: () =>
      import(/* webpackChunklabel: "ColorPicker" */ "./components/ColorPicker"),
    tag: "color-picker"
  },
  {
    label: "Dashboard",
    src: () =>
      import(/* webpackChunklabel: "Dashboard" */ "./components/Dashboard/Component"),
    tag: "dashboard-component"
  },
  {
    label: "Contacts",
    src: () =>
      import(/* webpackChunklabel: "Contacts" */ "./components/Contacts/Component"),
    tag: "contacts-component"
  },
  {
    label: "Muuri",
    src: () =>
      import(/* webpackChunklabel: "Muuri" */ "./components/muuri/component"),
    tag: "muuri-component"
  }
];
