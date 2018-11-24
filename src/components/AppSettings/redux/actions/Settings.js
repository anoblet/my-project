export const CHANGE_THEME = 'CHANGE_THEME';
export const TOGGLE_DEBUG = 'TOGGLE_DEBUG';

export const setDebug = (status) => (dispatch) => {
  dispatch({
    status,
    type: TOGGLE_DEBUG
  });
}

export const setTheme = (theme) => (dispatch) => {
  dispatch({
    theme,
    type: CHANGE_THEME
  });
}
