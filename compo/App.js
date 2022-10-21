import React, { useEffect } from "react";
import Alert from "./Alert";
import Navbar from "./Navbar";
import LoadingBar from "react-top-loading-bar";
import { Router } from "next/router";
import { useTopBar } from "../store";

const App = ({ Component, pageProps }) => {
  let topBar = useTopBar();

  useEffect(() => {
    const start = () => {
      // console.log("start");
      topBar.setTopBar(20);

      // setLoading(true);
    };
    const end = () => {
      topBar.setTopBar(100);

      // console.log("findished");
      // setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
  }, []);

  return (
    <>
      <LoadingBar
        color="red"
        height={3.5}
        progress={topBar.progress}
        waitingTime={200}
      />

      <Navbar />
      <Alert />
      <Component {...pageProps} />
    </>
  );
};

export default App;
