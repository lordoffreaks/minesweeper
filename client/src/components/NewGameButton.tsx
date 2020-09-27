import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { v4 } from "uuid";
import { useSocket } from "../hooks/useSocket";

const NewGameButton: React.FC = () => {
  const history = useHistory();
  const socket = useSocket();
  const onClick = () => {
    const gameId = v4();
    socket.emit("create-game", gameId);
    history.push(`/game/${gameId}`);
  };

  return <Button onClick={onClick}>Start a new game</Button>;
};

export default NewGameButton;
