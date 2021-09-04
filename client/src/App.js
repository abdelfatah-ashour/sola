import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { io } from "socket.io-client";
import Loading from "./components/Loading";
import Nav from "./components/Nav";

export const Socket_Io = io(process.env.REACT_APP_API, {
  transports: ["websocket"],
  secure: process.env.REACT_APP_MODE !== "development",
  reconnection: 500,
});

Socket_Io.on("connect", () => {
  console.log("connected");
});

Socket_Io.on("error", (error) => {
  console.log("Error socket : ", error.message);
});

Socket_Io.on("disconnected", () => {
  console.log("disconnected");
});

const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Room = lazy(() => import("./pages/Room"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  const { Auth } = useSelector((state) => state);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/" exact>
            <Suspense fallback={<Loading />}>
              {Auth.isLogin ? <Home /> : <Redirect to="/register" />}
            </Suspense>
          </Route>
          <Route path="/register">
            <Suspense fallback={<Loading />}>
              {Auth.isLogin ? <Redirect to="/" /> : <Register />}
            </Suspense>
          </Route>
          <Route path="/room/:roomId">
            <Suspense fallback={<Loading />}>
              {Auth.isLogin ? <Room /> : <Redirect to="/register" />}
            </Suspense>
          </Route>
          <Route>
            <Suspense fallback={<Loading />}>
              <PageNotFound />
            </Suspense>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
