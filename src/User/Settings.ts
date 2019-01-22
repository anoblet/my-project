export const settings = [
  {
    description: "Enable the right-click of the mouse to toggle the main menu",
    label: "Right click",
    name: "rightClick",
    type: Boolean
  },
  {
    description: "Mode",
    label: "Mode",
    name: "mode",
    type: "select",
    options: [
      {
        label: "Production",
        value: 0
      },
      {
        label: "Development",
        value: 1
      },
      {
        label: "Experimental",
        value: 2
      }
    ],
    statePath: "app/settings/mode"
  }
];
