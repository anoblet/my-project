export const setTheme = (theme: any, element: any) => {
  theme.map((propertyMap: any) => {
    element.style.setProperty(propertyMap.property, propertyMap.value);
  });
};
