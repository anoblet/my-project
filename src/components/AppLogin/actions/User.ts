export const SET_STATE = 'SET_STATE';

export const setState = (state: any) => (dispatch: any) => {
  dispatch({
    type: SET_STATE,
    state
  });
}
