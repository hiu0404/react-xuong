import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { LoadingProvider } from "./components/contexts/loading.tsx";
import { CartProvider } from "./components/contexts/cart.tsx";
import { UserProvider } from "./components/contexts/user.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <UserProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </UserProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
