export const CHANGE_THEME = 'CHANGE_THEME';
export const TOGGLE_DEBUG = 'TOGGLE_DEBUG';

export const changeTheme = () => (dispatch, getState) => {
  const state = getState();
  const theme = state.settings.theme == 'light' ? 'dark' : 'light';
  dispatch({
    type: CHANGE_THEME,
    theme,
  });
};

export const toggleDebug = () => (dispatch, getState) => {
  const state = getState();
  const status = !state.settings.debug;
  dispatch({
    type: TOGGLE_DEBUG,
    status,
  });
};
