import {
  CLEAN_UP_REGISTER_PROCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from "../constant";

const registerReducer = (
  state = { loading: false, user: null, error: null },
  action
) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { loading: true };
    case REGISTER_USER_FAIL:
      return { loading: false, error: action.payload };
    case REGISTER_USER_SUCCESS:
      return { loading: false, message: action.payload };
    case CLEAN_UP_REGISTER_PROCESS:
      return { loading: null, user: null, error: null };
    default:
      return state;
  }
};

export default registerReducer;
