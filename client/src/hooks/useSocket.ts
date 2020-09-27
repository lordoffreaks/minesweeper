import { useSelector } from "react-redux";
import { State } from "../models/state";

export const useSocket = () => {
  const socket: SocketIOClient.Socket = useSelector(
    ({ socket }: State) => socket
  );

  return socket;
};
