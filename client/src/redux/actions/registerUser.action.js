import instant from "../../axios.config";
import {
  CLEAN_UP_REGISTER_PROCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from "../constant";

export const registerUserAction = (formData) => async (dispatch) => {
  dispatch({ type: REGISTER_USER_REQUEST });
  try {
    const { data } = await instant.post("/auth/register", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.meta.message,
    });
  } catch (error) {
    console.log(error);
    return dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response ? error.response.data : "Can't request",
    });
  }
};

export const cleanUpRegisterAction = () => (dispatch) =>
  dispatch({ type: CLEAN_UP_REGISTER_PROCESS });
