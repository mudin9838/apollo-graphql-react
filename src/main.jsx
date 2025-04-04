import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:3000/",
  cache: new InMemoryCache(),
});
// @ts-ignore
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
