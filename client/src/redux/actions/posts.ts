import { Dispatch } from "redux";
import { fetchPosts } from "../../api/posts";
import { IPost } from "../../types/post";
import { ACTIONS } from "../constans";
import { TState } from "../store";

export const likePost = (post: IPost) => {
  return { type: ACTIONS.LIKE_POST, post };
};

export const markPost = (post: IPost) => {
  return { type: ACTIONS.MARK_POST, post };
};

export const setAllPosts = (posts: IPost[]) => {
  return {
    type: ACTIONS.SET_ALL_POSTS,
    posts,
  };
};

export const loadAllPosts = (searchText: string) => {
  return (dispatch: Dispatch, getState: () => TState) => {
    dispatch(setIsLoading(true));
    fetchPosts(searchText)
      .then((values) => {
        if (values.count > values.results.length) {
          dispatch(setShowLoadMore(true));
        } else {
          dispatch(setShowLoadMore(false));
        }
        dispatch(setAllPosts(values.results));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
};

export const setIsLoading = (isLoading: boolean) => {
  return {
    type: ACTIONS.SET_IS_LOADING,
    isLoading,
  };
};

export const setShowLoadMore = (showLoadMore: boolean) => {
  return {
    type: ACTIONS.SET_SHOW_LOAD_MORE,
    showLoadMore,
  };
};

export const loadMorePosts = (searchText: string) => {
  return (dispatch: Dispatch, getState: () => TState) => {
    const allPosts = getState().PostsReducer.allPosts;
    const promise = fetchPosts(searchText, allPosts.length);
    promise.then((values) => {
      if (values.results.length + allPosts.length === values.count) {
        dispatch(setShowLoadMore(false));
      }

      dispatch(setAllPosts(allPosts.concat(values.results)));
    });
  };
};
