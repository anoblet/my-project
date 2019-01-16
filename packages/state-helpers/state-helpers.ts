export const setState = ({
  data,
  store,
  type,
  config = { merge: true }
}: any) => {
  this.store.dispatch({
    type: type,
    state: data,
    merge: config.merge
  });
};
