import { useReducer } from "react";

function postsReducer(state, action) {
  switch (action.type) {
    case "FETCH_ALL":
      return {
        activeAll: true,
        activeFollowings: false,
        activeLastMinute: false,
      };
    case "FETCH_FOLLOWINGS":
      return {
        activeAll: false,
        activeFollowings: true,
        activeLastMinute: false,
      };
    case "FETCH_LAST_MINUTE":
      return {
        activeAll: false,
        activeFollowings: false,
        activeLastMinute: true,
      };
    default:
      return state;
  }
}

export const usePosts = () => {
  const [postsState, dispatchPosts] = useReducer(postsReducer, {
    activeAll: true,
    activeFollowings: false,
    activeLastMinute: false,
  });

  return {
    postsState,
    dispatchPosts,
  };
};
