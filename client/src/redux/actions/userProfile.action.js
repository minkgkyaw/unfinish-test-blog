import jwtDecode from "jwt-decode";
export const userProfileAction = () => {
  const { token, rf_token } = JSON.parse(localStorage.getItem("token"));
  const { exp, id } = jwtDecode(token);
  const date = Date.now();
};
