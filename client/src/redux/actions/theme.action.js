import { DARK_MODE, LIGHT_MODE } from "../constant";

export const changeThemeToLight = () => (dispatch) => {
  localStorage.setItem("theme", "light");
  return dispatch({ type: LIGHT_MODE });
};

export const changeThemeToDark = () => (dispatch) => {
  localStorage.setItem("theme", "dark");
  return dispatch({ type: DARK_MODE });
};
