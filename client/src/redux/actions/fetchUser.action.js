import instant from "../../axios.config";
import {
  FAIL_USER_PROFILE,
  REQUEST_USER_PROFILE,
  SUCCESS_USER_PROFILE,
} from "../constant";

export const fetchUserAction = (id, token) => async (dispatch) => {
  dispatch({ type: REQUEST_USER_PROFILE });
  try {
    const { data } = await instant.get(`/users/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return dispatch({
      type: SUCCESS_USER_PROFILE,
      payload: data.user,
    });
  } catch (err) {
    return dispatch({
      type: FAIL_USER_PROFILE,
      payload: err.response.data
        ? err.response.data.message
        : "Internal Server Error",
    });
  }
};
