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
  }
];
