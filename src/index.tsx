import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./styles/styles.scss";

import App from "./containers/App";
import { LoaderProvider } from "./utils/useLoader";
import { PropertyListProvider } from "./utils/usePropertyList";

ReactDOM.render(
  <LoaderProvider>
    <PropertyListProvider>
      <Router>
        <App />
      </Router>
    </PropertyListProvider>
  </LoaderProvider>,

  document.getElementById("root")
);
