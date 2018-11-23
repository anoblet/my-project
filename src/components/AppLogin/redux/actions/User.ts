export const SET_STATE = 'SET_STATE';

export const setState = (state: any) => {
  return {
    type: SET_STATE,
    state: state
  }
}
