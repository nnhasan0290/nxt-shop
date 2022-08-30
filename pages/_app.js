import { Provider } from "react-redux";
import "../styles/globals.css";
import store from "./../redux/store.js";
import { Provider as AlertProvider, positions,transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
};
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <Component {...pageProps} />
      </AlertProvider>
    </Provider>
  );
}

export default MyApp;
