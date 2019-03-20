export const components = [
  {
    name: "Voice",
    src: () =>
      import(/* webpackChunkName: "Voice" */ "./components/VoiceComponent"),
    tag: "voice-component"
  },
  {
    name: "Collection List",
    src: () =>
      import(/* webpackChunkName: "ComponentList" */ "./components/Collection/CollectionList"),
    tag: "collection-list"
  },
  {
    name: "Philips Hue",
    src: () =>
      import(/* webpackChunkName: "PhilipsHue" */ "./components/PhilipsHue/LightsComponent"),
    tag: "lights-component"
  },
  {
    name: "Philips Hue Demo",
    src: () => import(/* webpackChunkName: "PhilipsHueDemo" */ "./components/PhilipsHue/Demo"),
    tag: "philips-hue-demo"
  },
  {
    name: "Eye Exam",
    src: () => import(/* webpackChunkName: "EyeExam" */ "./components/EyeExam/EyeExamComponent"),
    tag: "eye-exam"
  },
  {
    name: "Color Picker",
    src: () => import(/* webpackChunkName: "ColorPicker" */ "./components/ColorPicker"),
    tag: "color-picker"
  },
  {
    name: "Dashboard",
    src: () => import(/* webpackChunkName: "Dashboard" */ "./components/Dashboard/Component"),
    tag: "dashboard-component"
  },
  {
    name: "Contacts",
    src: () => import(/* webpackChunkName: "Contacts" */ "./components/Contacts/Component"),
    tag: "contacts-component"
  },
  {
    name: "Muuri",
    src: () => import(/* webpackChunkName: "Muuri" */ "./components/muuri/component"),
    tag: "muuri-component"
  }
];
