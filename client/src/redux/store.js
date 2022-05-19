import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import loginUserReducer from "./reducers/loginUser.reducer";
import registerReducer from "./reducers/register.reducer";
import themeReducer from "./reducers/theme.reducer";
import createNewBlogReducer from "./reducers/createBlog.reducer";
import userProfileReducer from "./reducers/fetchUser.reducer";

const reducer = combineReducers({
  loginUser: loginUserReducer,
  registerUser: registerReducer,
  theme: themeReducer,
  newBlog: createNewBlogReducer,
  userProfile: userProfileReducer,
});

const token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

const theme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : "light";

const store = createStore(
  reducer,
  { loginUser: { loading: null, token, error: null }, theme },
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
