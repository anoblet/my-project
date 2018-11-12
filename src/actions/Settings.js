export const CHANGE_THEME = 'CHANGE_THEME';
export const TOGGLE_DEBUG = 'TOGGLE_DEBUG';

// export const changeTheme = () => (dispatch, getState) => {
//   const state = getState();
//   const theme = state.settings.theme == 'light' ? 'dark' : 'light';
//   dispatch({
//     type: CHANGE_THEME,
//     theme,
//   });
// };

export const setDebug = (status) => (dispatch) => {
  dispatch({
    type: TOGGLE_DEBUG,
    status
  });
}

// export const setDebug = (status) => {
//   return {
//     type: TOGGLE_DEBUG,
//     status
//   };
// };

export const setTheme = (theme) => (dispatch) => {
  dispatch({
    type: CHANGE_THEME,
    theme
  });
}

// export const setTheme = (theme) => {
//   return {
//     type: CHANGE_THEME,
//     theme
//   };
// };
