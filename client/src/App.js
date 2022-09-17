import React, { lazy, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { io } from "socket.io-client";
import Loading from "./components/Loading";
import Nav from "./components/Nav";
import { PageNotFound } from "./pages/PageNotFound";
const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Room = lazy(() => import("./pages/Room"));

export const Socket_Io = io(process.env.REACT_APP_API, {
  transports: ["websocket"],
  secure: process.env.REACT_APP_MODE !== "development",
  reconnection: 500,
});

function App() {
  useEffect(() => {
    Socket_Io.on("connect", () => {
      console.log("connect");
    });

    Socket_Io.on("disconnect", () => {
      console.log("disconnect");
    });

    Socket_Io.on("pong", () => {
      console.log("pong");
    });

    return () => {
      Socket_Io.off("connect");
      Socket_Io.off("disconnect");
      Socket_Io.off("pong");
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/" exact>
            <Suspense fallback={<Loading />}>{<Home />}</Suspense>
          </Route>
          <Route path="/register">
            <Suspense fallback={<Loading />}>{<Register />}</Suspense>
          </Route>
          <Route path="/room/:roomId">
            <Suspense fallback={<Loading />}>{<Room />}</Suspense>
          </Route>
          <Route path="*" component={<PageNotFound />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
