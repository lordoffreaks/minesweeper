import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Alert, ButtonGroup, Col, Row } from "reactstrap";
import { useSocket } from "../hooks/useSocket";
import { State } from "../models/state";
import { revealSquare } from "../store/actions";
import NewGameButton from "./NewGameButton";
import Square from "./Square";

type GridProps = {
  grid: GridRow[];
};

type GridRow = {
  adjacents: number;
  index: number;
  isMine: boolean;
  reveal?: boolean;
}[];

const Grid: React.FC<GridProps> = ({ grid }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const socket = useSocket();
  const isEnd = useSelector(({ isEnd }: State) => isEnd);

  useEffect(() => {
    if (socket) {
      socket.emit("join-game", id);
    }
  }, [dispatch, socket, id]);

  const onClick = (index: number) => () => {
    socket.emit("reveal-square", id, index);
    dispatch(revealSquare(index));
  };

  return (
    <Row>
      {isEnd && (
        <Col xs={12}>
          <Alert color="danger">
            Game over! <NewGameButton />
          </Alert>
        </Col>
      )}
      <Col xs={12}>
        <ButtonGroup vertical className="my-4">
          {grid.map((row, i) => {
            return (
              <ButtonGroup key={i}>
                {row.map(({ adjacents, index, reveal, isMine }) => {
                  return (
                    <Square
                      key={index}
                      adjacents={adjacents}
                      isMine={isMine}
                      reveal={isEnd || !!reveal}
                      disabled={!!isEnd}
                      onClick={onClick(index)}
                    />
                  );
                })}
              </ButtonGroup>
            );
          })}
        </ButtonGroup>
      </Col>
    </Row>
  );
};

export default Grid;
