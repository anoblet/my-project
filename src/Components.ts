export const components = [
  {
    label: "Voice",
    src: () =>
      import(/* webpackChunkName: "Voice" */ "./components/Voice/Component"),
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
      import(/* webpackChunkName: "EyeExam" */ "./components/EyeExam/Component"),
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
  },
  {
    label: "Weather",
    src: () =>
      import(/* webpackChunkName: "Weather" */ "./components/Weather/Component"),
    tag: "weather-component"
  },
  {
    label: "Location",
    src: () =>
      import(/* webpackChunkName: "Location" */ "./components/Location/Component"),
    tag: "location-component"
  },
  {
    label: "Clock",
    src: () =>
      import(/* webpackChunkName: "Clock" */ "./components/Clock/Component"),
    tag: "clock-component"
  },
  {
    label: "Playground",
    src: () =>
      import(/* webpackChunkName: "Playground" */ "./components/Playground/Component"),
    tag: "playground-component"
  },
  {
    label: "Google Chart",
    src: () =>
      import(/* webpackChunkName: "GoogleChart" */ "./components/GoogleChart/Component"),
    tag: "google-chart"
  },
  {
    label: "Chart JS",
    src: () =>
      import(/* webpackChunkName: "ChartJSDemo" */ "./components/ChartJS/Demo"),
    tag: "demo-component"
  },
  {
    label: "City SDK",
    src: () =>
      import(/* webpackChunkName: "CitySDK" */ "./components/CitySDK/Component"),
    tag: "city-sdk"
  },
  {
    label: "JSON Editor",
    src: () =>
      import(/* webpackChunkName: "JSONEditor" */ "./components/JSONEditor/Component"),
    tag: "json-editor"
  },
  {
    label: "Pomodoro",
    src: () =>
      import(/* webpackChunkName: "Pomodoro" */ "./components/Pomodoro/Component"),
    tag: "pomodoro-component"
  },
  {
    label: "Ratio",
    src: () =>
      import(/* webpackChunkName: "RatioDemo" */ "./components/Ratio/Demo"),
    tag: "ratio-demo"
  }
];
