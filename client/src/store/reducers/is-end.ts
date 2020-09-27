import { ActionTypes } from "../actions/action-types";

export default (state: boolean = false, action: any) => {
  switch (action.type) {
    case ActionTypes.REFRESH_GRID:
      return action.grid.isEnd;
    default:
      return state;
  }
};
