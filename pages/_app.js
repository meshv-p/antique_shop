import { useEffect } from "react";
import App from "../compo/App";
import { Navbar } from "../compo/Navbar";
import { useAuth, useCartStore } from "../store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  let auth = useAuth();
  let cart = useCartStore();

  useEffect(() => {
    // check and set local storage user
    cart.getAllItems();

    auth.isLoggedinUser();
    // check production or development
    if (process.env.NODE_ENV === "production") {
      auth.setURL("production");
    } else {
      auth.setURL("development");
    }
  }, []);

  return (
    <>
      <App Component={Component} pageProps={pageProps} />
    </>
  );
}

export default MyApp;
