export const properties = {
  autoStart: {
    type: Boolean,
    label: "Auto start"
  },
  distanceFromScreen: {
    description: "Distance from screen as measured in meters",
    type: Number,
    label: "Distance from screen(meters)"
  },
  startFontSize: {
    label: "Font size",
    type: String
  },
  showHistory: {
    label: "Show history",
    type: Boolean
  },
  showNavigation: {
    label: "Show navigation",
    type: Boolean
  },
  showRecord: {
    label: "Show record",
    type: Boolean
  },
  perLine: {
    label: "Characters per line",
    type: Number
  },
  perLineThreshold: {
    description:
      "A value in between 0 and 1 indication correct answers/questions asked.",
    label: "Per line threshold",
    type: Number
  }
};
