import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";

import React from "react";

function ApolloServerComp({ children }) {
  const client = new ApolloClient({
    uri: "https://todo-list-anmol.herokuapp.com/",
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloServerComp;
