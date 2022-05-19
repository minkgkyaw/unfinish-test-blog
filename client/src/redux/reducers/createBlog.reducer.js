import {
  CREATE_BLOG_FAIL,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_SUCCESS,
} from "../constant";

const createNewBlogReducer = (
  state = { loading: false, blog: null, error: null },
  action
) => {
  switch (action.type) {
    case CREATE_BLOG_REQUEST:
      return { loading: true };
    case CREATE_BLOG_SUCCESS:
      return { loading: false, blog: action.payload };
    case CREATE_BLOG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default createNewBlogReducer;
