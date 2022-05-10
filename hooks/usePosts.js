import { useReducer } from "react";

function postsReducer(state, action) {
  switch (action.type) {
    case "FETCH_ALL":
      return {
        activeAll: true,
        activeFollowings: false,
        activeLastMinute: false,
        activeJobs: false,
        activeVideo: false,
      };
    case "FETCH_FOLLOWINGS":
      return {
        activeAll: false,
        activeFollowings: true,
        activeLastMinute: false,
        activeJobs: false,
        activeVideo: false,
      };
    case "FETCH_LAST_MINUTE":
      return {
        activeAll: false,
        activeFollowings: false,
        activeLastMinute: true,
        activeJobs: false,
        activeVideo: false,
      };
    case "FETCH_JOBS":
      return {
        activeAll: false,
        activeFollowings: false,
        activeLastMinute: false,
        activeJobs: true,
        activeVideo: false,
      };
    case "FETCH_VIDEO":
      return {
        activeAll: false,
        activeFollowings: false,
        activeLastMinute: false,
        activeJobs: false,
        activeVideo: true,
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
