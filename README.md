# Minesweeper

To run the project execture

```
make run
```

## Structure

The project has been divided into `client` and `server` in order to test the funcionality using the client in a browser.

Ideally it would have test (unit, integration, acceptance, e2e, cdc, ...) but time limitations made it not possible.

For the WS management I've decided to use `socket.io` for bot the client and the server, given it provides some built in functionality, like `rooms` which made the task easier.

### Client

The client is a Create React App instance with redux in order to manage the state

### Server

A simple WS server on top of `socket.io` and the native `http` node library. For a prodution scenario something like `express` would be needed in order to server the static files for the `client` which will replace the `http` server to be resued by the WS.

## Considerations

Error handling wasn't implemented due to limitation of time.
Testing wasn't implemented due to limitation of time.
The storage service is intentionally `in memory` because it's easier to implement for this use case but could be easliy moved to `redis` or something like that.

## How to test it

Start the application using `make run`, click the `Start a new game button`, open that same url in a another tab / window / browser and start revealing squares in both, both tabs should be in sync.

## Going further

It wouldn't be difficult to create a list of active games in the `Homepage` so the users could join one if they want to.
