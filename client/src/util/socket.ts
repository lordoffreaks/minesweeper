import io from "socket.io-client";

export const createIOClient = (onRefreshGrid: Function) => {
  const socket = io("http://localhost:3001");

  socket.on("refresh-grid", (data: any) => {
    onRefreshGrid(data);
  });

  return socket;
};
