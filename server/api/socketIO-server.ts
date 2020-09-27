import { Server } from "http";
import socketIO from "socket.io";
import { generateGrid, renderGrid, revealSquare } from "./grid";
import { StorageService } from "./storage";

const width = 5;
const height = 7;
const mines = 12;
const games = {};

export const createIOServer = (server: Server, storage: StorageService) => {
  const io = socketIO(server);

  const refreshGrid = (grid: any, gameId: string, isEnd: boolean) => {
    io.to(gameId).emit("refresh-grid", {
      grid,
      isEnd,
    });
  };

  io.on("connection", (socket) => {
    console.info(`Client connected`);

    socket.on("disconnect", () => {
      console.info(`Client disconnected`);
    });

    socket.on("create-game", (gameId) => {
      console.log("Create game: ", gameId);
      const tmpGrid = generateGrid(width, height, mines);
      const index = Math.floor(Math.random() * tmpGrid.length);
      const { grid } = revealSquare(tmpGrid, index);
      storage.set(gameId, grid);
    });

    socket.on("join-game", (gameId) => {
      console.log("join-game", gameId);
      socket.join(gameId);
      const grid = renderGrid(storage.get(gameId), width);
      refreshGrid(
        grid,
        gameId,
        grid.some((square: any) => square.isMine && !!square.reveal)
      );
    });

    socket.on("reveal-square", (gameId, index) => {
      console.info(`reveal-square`, gameId, index);
      const { grid, isEnd } = revealSquare(storage.get(gameId), index);
      refreshGrid(renderGrid(grid, width), gameId, isEnd);
    });
  });

  console.info("WS server created");

  return io;
};
