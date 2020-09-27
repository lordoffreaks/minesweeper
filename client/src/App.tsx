import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row } from "reactstrap";
import Grid from "./components/Grid";
import Home from "./components/Home";
import { useSocket } from "./hooks/useSocket";
import { refreshGrid, socketConnect } from "./store/actions";
import { createIOClient } from "./util/socket";

const App = () => {
  const dispatch = useDispatch();
  let socket = useSocket();
  let grid = useSelector(({ grid }: any) => grid);

  useEffect(() => {
    if (!socket) {
      const onRefreshGrid = (grid: any) => {
        dispatch(refreshGrid(grid));
      };
      let socket = createIOClient(onRefreshGrid);
      dispatch(socketConnect(socket));
    }
  }, [dispatch, socket]);

  return (
    <Container style={{ height: "100vh" }}>
      <Row className="row h-100 justify-content-center align-items-center">
        <Router>
          <Switch>
            <Route path="/game/:id">
              <Grid grid={grid} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </Row>
    </Container>
  );
};

export default App;
