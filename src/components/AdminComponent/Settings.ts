export const fields = [
  {
    label: "Mode",
    name: "mode",
    type: "dropdown",
    options: [
      { label: "Production", value: 0 },
      { label: "Development", value: 1 },
      { label: "Experimental", value: 2 }
    ],
    statePath: "app/settings/mode"
  }
];
