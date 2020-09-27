import { ActionTypes } from "../actions/action-types";

export default (state: number[] = [], action: any) => {
  switch (action.type) {
    case ActionTypes.REFRESH_GRID:
      return action.grid.grid;
    default:
      return state;
  }
};
