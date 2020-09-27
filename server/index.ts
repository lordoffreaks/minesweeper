import { createServer } from "http";
import { createIOServer } from "./api/socketIO-server";
import { createStorageService } from "./api/storage";

const storage = createStorageService();

const server = createServer();
createIOServer(server, storage);

server.listen(process.env.SERVER_PORT || 3001);
