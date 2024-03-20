import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "./App.css";
import CreateUser from "./Components/Users/CreateUser";
import ListOfUsers from "./Components/Users/ListOfUsers";
import UpdatePassword from "./Components/Users/UpdatePassword";
import { TwoLayout } from "./Components/Layout/TwoLayout";
import { Header } from "./Components/Layout/Header";
import {BrowserRouter as Router} from 'react-router-dom'
function App() {
  const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <>
      <ApolloProvider client={client}>
      <Router>
        <TwoLayout/>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
