import App from "../compo/App";
import { Navbar } from "../compo/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <App Component={Component} pageProps={pageProps} />
    </>
  );
}

export default MyApp;
