import '../styles/globals.css';
import "../configureAmplify";
import NavigationBar from "./components/NavigationBar";

function MyApp({ Component, pageProps }) {
  return( <div><NavigationBar/><div><Component {...pageProps} /></div></div>)
}

export default MyApp;
