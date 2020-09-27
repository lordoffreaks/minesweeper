import { AnyAction } from "redux";
import { ActionTypes } from "./action-types";

export interface Action<T> extends AnyAction {
  type: T;
}

export const socketConnect = (socket: SocketIOClient.Socket) => ({
  type: ActionTypes.SOCKET_CONNECT,
  socket,
});

export const createGame = (id: string) => {
  return {
    type: ActionTypes.CREATE_GAME,
    id,
  };
};

export const refreshGrid = (grid: any) => {
  return {
    type: ActionTypes.REFRESH_GRID,
    grid,
  };
};

export const revealSquare = (index: number) => {
  return {
    type: ActionTypes.REVEAL_SQUARE,
    index,
  };
};
