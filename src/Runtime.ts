import { AppTheme } from "./components/AppTheme/AppTheme";
export const runtime = [
  new Promise((resolve, reject) => {
    const theme = new AppTheme();
    theme.runtime();
    resolve();
  })
];
