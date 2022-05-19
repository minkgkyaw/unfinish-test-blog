import instant from "../../axios.config";

const refreshTokenAction = (token) => {
  async (dispatch) => {
    dispatch({ type: "REFRESH_TOKEN_FETCH_REQUEST" });
    try {
      const { data } = instant.get("/auth/refresh_token/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch({ type: "REFRESH_TOKEN_FETCH_SUCCESS" });
    } catch (err) {
      return dispatch({
        type: "REFRESH_TOKEN_FETCH_FAIL",
        payload: err.response.data
          ? err.response.data
          : "Internal Server Error",
      });
    }
  };
};
