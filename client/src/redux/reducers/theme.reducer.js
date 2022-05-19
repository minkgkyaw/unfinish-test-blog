import { DARK_MODE, LIGHT_MODE } from "../constant";

const themeReducer = (state = "light", action) => {
  switch (action.type) {
    case LIGHT_MODE: {
      document.body.classList.remove("dark");
      return "light";
    }
    case DARK_MODE: {
      document.body.classList.add("dark");

      return "dark";
    }
    default:
      return state;
  }
};

export default themeReducer;
