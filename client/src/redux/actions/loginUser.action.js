import instant from "../../axios.config";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "../constant";

// use in login (req, data, err)
export const loginAction = (formData, token) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const { data } = await instant.post("/auth/login", formData, {
        headers: {
          "Content-Type": "application/json",
          'authorization': `Bearer ${token}`
        },
      });
      localStorage.setItem("token", JSON.stringify(data.user));
      return dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (err) {
      return dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data ? err.response.data : "can't request",
      });
    }
  };
};

export const logOutAction = () => {
  localStorage.removeItem("token");
  return (dispatch) => dispatch({ type: LOGOUT });
};
