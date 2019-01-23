const loadFirebase = (modules: any = [], callback: any) => {
  let temp: any = [import(/* webpackChunkName: "Firebase" */ "firebase/app")];
  if (modules.includes("auth"))
    // @ts-ignore
    temp.push(import(/* webpackChunkName: "Firebase" */ "firebase/auth"));
  if (modules.includes("firestore"))
    // @ts-ignore
    temp.push(import(/* webpackChunkName: "Firebase" */ "firebase/firestore"));

  Promise.all(temp).then(([firebase]) => callback(firebase));
};
