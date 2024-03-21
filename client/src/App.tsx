import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "./App.css";
import { TwoLayout } from "./Components/Layout/TwoLayout";
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
function App() {
  const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
  });

  const token = localStorage.getItem("token");

  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          {
            token ? <TwoLayout />: <div>kesini</div>
          }
          
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
