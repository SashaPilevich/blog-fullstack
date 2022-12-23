import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { IPostsState, PostsReducer } from "./reducers/posts";
import thunk from "redux-thunk";

export interface TState {
  PostsReducer: IPostsState;
}
export let store = createStore(
  combineReducers({ PostsReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);
