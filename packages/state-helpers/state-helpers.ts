export const setState = ({
  data,
  store,
  type,
  config = { merge: true }
}: any) => {
  store.dispatch({
    type,
    state: data,
    merge: config.merge
  });
};
