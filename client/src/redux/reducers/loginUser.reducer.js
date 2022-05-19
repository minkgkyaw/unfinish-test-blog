import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "../constant";

const authUserReducer = (
  state = { loading: false, token: null, error: null },
  action
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
      };
    case LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        token: action.payload,
      };
    case LOGOUT:
      return { loading: null, token: null, error: null };
    default:
      return state;
  }
};

export default authUserReducer;
