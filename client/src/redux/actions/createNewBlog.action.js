import instant from "../../axios.config"
import { CREATE_BLOG_FAIL, CREATE_BLOG_REQUEST, CREATE_BLOG_SUCCESS } from "../constant"

export const createNewBlogAction = (formData) => async dispatch => {
  dispatch({type: CREATE_BLOG_REQUEST})
  try {
    const {data} = await instant.post('/blogs', formData, {
      headers: {
        "Content-Type": "application/json",
      }
    })

    return dispatch({type: CREATE_BLOG_SUCCESS, payload: data})
  } catch (err) {
    return dispatch({type: CREATE_BLOG_FAIL, payload: err.response.data ? err.response.data.message : 'Internal Server Error'})
  }
} 