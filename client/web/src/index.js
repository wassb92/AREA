import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";

global.API_ENDPOINT = "http://localhost:8080";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
