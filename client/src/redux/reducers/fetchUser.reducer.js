import {
  FAIL_USER_PROFILE,
  REQUEST_USER_PROFILE,
  SUCCESS_USER_PROFILE,
} from "../constant";

const userProfileReducer = (
  state = { loading: false, user: null, error: null },
  action
) => {
  switch (action.type) {
    case REQUEST_USER_PROFILE:
      return { loading: true };
    case SUCCESS_USER_PROFILE:
      return { loading: false, user: action.payload };
    case FAIL_USER_PROFILE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userProfileReducer;
