export const properties = (component: any) => [
  {
    label: "Auto-start",
    name: "autoStart",
    onChange: (e: any) => component.autoStart = e.target.checked,
    type: Boolean
  },
  {
    label: "Font size",
    name: "fontSize",
    type: String
  },
  {
    label: "Hide navigation",
    name: "hideNavigation",
    onChange: (e: any) => component.hideNavigation = e.target.checked,
    type: Boolean
  }
];
