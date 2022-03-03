import { types } from "../types/types";

export const jobReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case types.loadJobs:
      return {
        ...state,
        jobs: action.payload.jobs,
      };

    case types.loadJob:
      return {
        ...state,
        job: action.payload.job,
      };
    default:
      return state;
  }
};
