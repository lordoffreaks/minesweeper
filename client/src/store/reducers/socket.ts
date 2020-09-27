import { ActionTypes } from "../actions/action-types";

export default (state: SocketIOClient.Socket | null = null, action: any) => {
  switch (action.type) {
    case ActionTypes.SOCKET_CONNECT:
      return action.socket;
    default:
      return state;
  }
};
