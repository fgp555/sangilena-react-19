import "./styles/global.scss";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import RoutesComp from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RoutesComp />
    </BrowserRouter>
  </StrictMode>
);
