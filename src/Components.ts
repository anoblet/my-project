export const components = [
  {
    name: "Voice",
    src: () => import("./components/VoiceComponent"),
    tag: "voice-component"
  },
  {
    name: "Collection List",
    src: () => import("./components/Collection/CollectionList"),
    tag: "collection-list"
  },
  {
    name: "Philips Hue",
    src: () => import("./components/PhilipsHue/LightsComponent"),
    tag: "lights-component"
  },
  {
    name: "Eye Exam",
    src: () => import("./components/EyeExam/EyeExamComponent"),
    tag: "eye-exam"
  }
];
