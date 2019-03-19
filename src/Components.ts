export const components = [
  {
    src: () => import("./components/VoiceComponent"),
    tag: "voice-component"
  },
  {
    src: () => import("./components/Collection/CollectionList"),
    tag: "collection-list"
  }
];
