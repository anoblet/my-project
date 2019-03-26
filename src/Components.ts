export const components = [
  {
    label: "Voice",
    src: () =>
      import(/* webpackChunkName: "Voice" */ "./components/VoiceComponent"),
    tag: "voice-component"
  },
  {
    label: "Collection List",
    src: () =>
      import(/* webpackChunkName: "ComponentList" */ "./components/Collection/CollectionList"),
    tag: "collection-list"
  },
  {
    label: "Philips Hue",
    src: () =>
      import(/* webpackChunkName: "PhilipsHue" */ "./components/PhilipsHue/LightsComponent"),
    tag: "lights-component"
  },
  {
    label: "Philips Hue Demo",
    src: () =>
      import(/* webpackChunkName: "PhilipsHueDemo" */ "./components/PhilipsHue/Demo"),
    tag: "philips-hue-demo"
  },
  {
    label: "Eye Exam",
    src: () =>
      import(/* webpackChunkName: "EyeExam" */ "./components/EyeExam/EyeExamComponent"),
    tag: "eye-exam"
  },
  {
    label: "Color Picker",
    src: () =>
      import(/* webpackChunkName: "ColorPicker" */ "./components/ColorPicker"),
    tag: "color-picker"
  },
  {
    label: "Dashboard",
    src: () =>
      import(/* webpackChunkName: "Dashboard" */ "./components/Dashboard/Component"),
    tag: "dashboard-component"
  },
  {
    label: "Contacts",
    src: () =>
      import(/* webpackChunkName: "Contacts" */ "./components/Contacts/Component"),
    tag: "contacts-component"
  },
  {
    label: "Muuri",
    src: () =>
      import(/* webpackChunkName: "Muuri" */ "./components/muuri/component"),
    tag: "muuri-component"
  }
];
