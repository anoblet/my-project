export const loadFirebase = (modules: any = [], callback: any) => {
  const temp: any = [import(/* webpackChunkName: "Firebase" */ "firebase/app")];
  if (modules.includes("auth"))
    temp.push(import(/* webpackChunkName: "Firebase" */ "firebase/auth"));
  if (modules.includes("firestore"))
    // @ts-ignore
    temp.push(import(/* webpackChunkName: "Firebase" */ "firebase/firestore"));

  Promise.all(temp).then(([firebase]) => callback(firebase));
};

export const run = (packages: any, callback: any) => {
  const imports = [];
  imports.push(import(/* webpackChunkName: "Firebase" */ "firebase/app"));
  packages.includes("auth");
  Promise.all(imports).then(([firebase]) => callback(firebase));
};
