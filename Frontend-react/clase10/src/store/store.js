import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { jobReducer } from "../reducers/jobReducer";
import { companyReducer } from "../reducers/companyReducer";
import { authReducer } from "../reducers/authReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  job: jobReducer,
  company: companyReducer,
  auth: authReducer,
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
