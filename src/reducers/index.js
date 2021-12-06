import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import signIn from "./login";
import task from "./tasks";
const reducers = combineReducers({ signIn,task });

const store = () => {
  return createStore(reducers, composeWithDevTools());
};

export default store();
