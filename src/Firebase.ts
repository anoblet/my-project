export const run = async (packages: any) => {
  const imports: any = [];
  imports.push(import(/* webpackChunkName: "Firebase" */ "firebase/app"));
  if (packages.includes("auth"))
    imports.push(
      import(/* webpackChunkName: "FirebaseAuth" */ "firebase/auth")
    );
  if (packages.includes("firestore"))
    imports.push(
      import(/* webpackChunkName: "FirebaseFirestore" */ "firebase/firestore")
    );
  return Promise.all(imports).then(([firebase]) => firebase);
};

export const authRedirect = async () => {
  return run(["auth"]).then((firebase: any) => {
    const auth = firebase.auth();
    return auth.getRedirectResult().then((result: any) => {
      const user = result.user;
      return user;
    });
  });
};
