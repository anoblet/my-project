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
      return result.user;
    });
  });
};

/**
 * Gets user from Firebase if it exists
 * @return Promise
 */
export const getUser = async () => {
  return run(["auth"]).then((firebase: any) => {
    return new Promise((resolve: any) => {
      firebase.auth().onAuthStateChanged((user: any) => {
        resolve(user);
      });
    });
  });
};
