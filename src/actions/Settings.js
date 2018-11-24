// export const CHANGE_THEME = 'CHANGE_THEME';
// export const TOGGLE_DEBUG = 'TOGGLE_DEBUG';

export const setDebug = (status) => (dispatch) => {
  dispatch({
    type: 'TOGGLE_DEBUG',
    status
  });
}

export const setTheme = (theme) => (dispatch) => {
  dispatch({
    type: 'CHANGE_THEME',
    theme
  });
}
