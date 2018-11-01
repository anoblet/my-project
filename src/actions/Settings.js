export const CHANGE_THEME = 'CHANGE_THEME';

// export const changeTheme = (theme) => {
//   return {
//     type: CHANGE_THEME,
//     theme
//   };
// };

export const changeTheme = () => (dispatch, getState) => {
  const state = getState();
  const theme  = state.settings.theme == 'light' ? 'dark' : 'light';
  dispatch({
      type: CHANGE_THEME,
      theme,
    });
  };
